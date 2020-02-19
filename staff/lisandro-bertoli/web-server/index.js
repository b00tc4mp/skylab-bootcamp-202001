const http = require('http')
const fs = require('fs')
const logger = require('./logger')

const { argv: [, , port = 8080] } = process

const requestListener = (req, res) => {
    logger.info(`request from ${req.socket.remoteAddress} : ${req.url}`)
    const main = '/index.html'

    logger.debug(`starting readStream for requested url`)
    const rs = fs.createReadStream(`.${req.url === '/' ? main : req.url}`)

    if (req.url !== 'favicon.ico') {
        rs.on('data', body => {
            logger.info(`finished reading content of requested path. Sending as body`)

            res.end(body)
        })

        rs.on('error', error => {
            logger.warn(error)

            res.writeHead(404)
            res.end('<h1>NOT FOUND</h1>')
        })
    } else {
        logger.warn(error)

        res.writeHead(404)
        res.end('<h1>NOT FOUND</h1>')
    }
}

logger.info('starting server')
const server = http.createServer(requestListener)

server.listen(port, () => {
    logger.info(`server running on port ${port}`)
})

server.on('SIGINT', () => {
    logger.warn('server stopped abruptly')

    setTimeout(() => process.exit(0), 1000)
})