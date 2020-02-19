const http = require('http')
const logger = require('./logger')
const fs = require('fs')

const { argv: [, , port = 8080] } = process

logger.setDebugEnabled(true)

logger.debug('starting server')

const server = http.createServer((req, res) => {
    const {method, url, headers, httpVersion, socket} = req
    const rawRequest = `${method} ${url} HTTP/${httpVersion}
${Object.keys(headers).reduce((accum, header) => accum += `${header}: ${headers[header]}\n`, '')}`
    
    logger.info(`request from ${socket.remoteAddress}:
${rawRequest}`)

    const main = '/index.html'

    const rs = fs.createReadStream(`.${req.url === '/' ? main : req.url}`)
    
    res.setHeader('Content-Type', 'text/html')

    if (req.url !== 'favicon.ico') {
        rs.on('data', body => {
            logger.info('correct reading')
            res.write(body)
        })

        rs.on('end', () => {
            logger.info('end of the chunk')
            res.end()
        })

        rs.on('error', error => {
            logger.warn(error)
            res.writeHead(404)
            res.end('<h1>NOT FOUND<h1>')
        })
    } else {
        logger.warn(error)
        res.writeHead(404)
        res.end('<h1>NOT FOUND<h1>')
    }
})

server.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    setTimeout(() => process.exit(0), 1000)
})
