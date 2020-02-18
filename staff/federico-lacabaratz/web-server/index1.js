const net = require('net')
const logger = require('./logger')
const fs = require('fs')

const { argv: [, , port = 8080] } = process

logger.setDebugEnabled(true)

logger.debug('starting server')

const server = net.createServer(socket => {
    logger.debug('setting encoding to utf8')
    socket.setEncoding('utf8')

    socket.on('data', chunk => {
        logger.info(`request from ${socket.remoteAddress}:
${chunk}`)


        const headers = chunk.split('\n')

        let path = headers[0].split(' ')[1]

        if (path === '/') path += 'index.html'

        const rs = fs.createReadStream(`.${path}`)

        if (path !== 'favicon.ico') {
            rs.on('data', content => {
                logger.debug(`content received from file stream reading`)

                socket.end(`HTTP/1.1 200 OK
Content-Type: text/html

${content.toString()}
`)
            })
            rs.on('error', error => {
                logger.error(error)

                socket.end(`HTTP/1.1 404 NOT FOUND
<h1>NOT FOUND</h1>`)
            })

        } else {
            socket.end(`HTTP/1.1 404 NOT FOUND
<h1>NOT FOUND</h1>`)
        }

    })

    socket.on('error', error => logger.error(error))
})

server.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    setTimeout(() => process.exit(0), 1000)
})
// const net = require('net')
// const fs = require('fs')
// const logger = require('./logger')
// let connections = 0

// logger.info('starting server')

// const server = net.createServer(socket => {
//     debugger
//     socket.on('data', chunk => {

//         //socket.end(`HTTP/1.1 200 OK\nServer: Cowboy\nAccess-Control-Allow-Origin: *\nConnections: ${++connections}\nContent-Type: text/html\n\n<h1>HOLA MUNDO</h1>\n`)
//         debugger

        
//         socket.end(`HTTP/1.1 404
//         Connections: ${++connections}
//         Content-Type: text/html
        
        
//         <h1>Not found</h1>`)
//         socket.on('error', error => { logger.error(error.message) })
// })
// })

// server.listen(8080)




// const net = require('net')
// const fs = require('fs')
// const logger = require('./logger')
// const server = net.createServer(socket => {
//     socket.on('data', chunk => {
//         const [methodFile] = chunk.toString().split('\n')
//         let [, file] = methodFile.split(' ')
//         file = file.replace('/', '')
//         logger.host = socket.remoteAddress
//         const endSocket = (status, statusMessage, html = '') =>{
//             socket.end(`HTTP/1.1 ${status} ${statusMessage}\nServer: Cowboy\nAccess-Control-Allow-Origin: *\nContent-Type: text/html\n\n${html}\n`) // Content-Type: text/html
//         }
//         // let html = ''
//         // fs.createReadStream('../23/index.html')
//         // console.log(fs)
//         // fs.on('data', chunk => html += chunk.toString())
//         // fs.on('end', () => endSocket('200', 'OK', html))
//         // fs.on('error', error => endSocket('404', 'Not Found', error.message))
//         // endSocket('404', 'Not Found', 'error.message')
//         fs.readFile(file, (error, data) => {
//             if (error) {
//                 logger.error(error.message)
//                 endSocket('404', 'Not Found', `<h1>${error.message}</h1>`)
//                 return
//             }
//             logger.info('User visited ' + file)
//             endSocket('200', 'OK', data.toString())
//         })
//     })
// })
// server.listen(8080)