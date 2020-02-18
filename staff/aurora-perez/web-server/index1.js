const net = require('net')
const fs = require('fs')
const logger = require('./logger')

logger.info('starting server')

const { argv: [, , port = 8080] } = process

const server = net.createServer(socket => {
    logger.debug('set socket enconding to utf-8')

    socket.setEncoding('utf-8')

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
${content}
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

    socket.on('error', error => {
        logger.error(error)
    })
})

server.listen(port, () => logger.info(`Server running on port ${port}`))

server.on('SIGINT', () => {
    logger.warn('server stopped abruptly')

    setTimeout(() => process.exit(0), 1000)
})