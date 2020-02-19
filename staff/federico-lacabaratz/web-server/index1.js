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
            logger.error('Possible problem due to favicon.ico file request')

            socket.end(`HTTP/1.1 404 NOT FOUND
<h1>NOT FOUND</h1>`)
        }

    })

    socket.on('error', error => logger.error(error))
    logger.error(error)

})

server.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    setTimeout(() => process.exit(0), 1000)
})