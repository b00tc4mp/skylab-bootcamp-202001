const http = require('http')
const fs = require('fs')
const logger = require('./logger')

const { argv: [, , port = 8080] } = process

const requestListener = (req, res) => {
    const { url, socket, httpVersion } = req
    logger.info(`request from ${socket.remoteAddress} : ${url} HTTP/${httpVersion}`)

    const main = '/index.html'

    if (url === 'favicon.ico') {
        logger.warn(error)

        res.writeHead(404)
        return res.end('<h1>NOT FOUND</h1>')
    }

    const rs = fs.createReadStream(`.${url === '/' ? main : url}`)

    rs.setHeader('Content-Type', 'text/html')

    rs.pipe(res)

    rs.on('error', error => {
        logger.warn(error)

        res.writeHead(404)
        res.end('<h1>NOT FOUND</h1>')
    })
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