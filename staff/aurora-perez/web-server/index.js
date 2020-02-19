const http = require('http')
const fs = require('fs')
const logger = require('./logger')

logger.info('starting server')

const { argv: [, , port = 8080] } = process

const requestListener = (req, res) => {
    const path = req.url

    const main = '/index.html'

    const rs = fs.createReadStream(`.${path === '/' ? main : path}`)

    res.setHeader ('Content-type', 'text/html')

    if (path !== 'favicon.ico') {

        logger.info(`request from ${req.connection.remoteAddress}`)

        rs.pipe(res)

        rs.on('error', error => {
            logger.error(error)
            res.writeHead(404)
            res.end('NOT FOUND')
        })
    } else {
        logger.error(error)
        res.writeHead(404)
        res.end('NOT FOUND')
    }

    req.on('error', error => {
        logger.error(error)
        res.writeHead(404)
        res.end('NOT FOUND') 
    })

}

logger.info('starting server')

const server = http.createServer(requestListener)

server.listen(port)