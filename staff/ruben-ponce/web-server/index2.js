const fs = require('fs')
const net = require('net')
const logger = require('./logger')

const server = net.createServer( socket => {
    socket.on('data', chunck => {
        logger.host = socket.remoteAddress
        console.log(chunck.toString())

        const [firstLine] = chunck.toString().split('\n')
        let [, path] = firstLine.split(' ')
        path = path.replace('/', '')

        const endSocket = (status, statusMessage, html = '') => {
            socket.end(`HTTP/1.1 ${status} ${statusMessage}\nServer: Cowboy\nAccess-Control-Allow-Origin: *\nContent-Type: text/html\n\n${html}\n`) // Content-Type: text/html
        }

        fs.readFile(path, (error, data) => {
            if (error) {
                logger.warn(error.message)
                endSocket(404, 'Not found', error.message) 
                return
            }
            logger.info('ok')
            endSocket(200, 'ok', data.toString())
        })
    })
})

server.listen(8080)