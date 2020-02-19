const express = require('express')
const logger = require('./utils/logger')
const path = require('path')
const loggerMidWare = require('./utils/logger-mid-ware')
const register = require('./logic/register')
const authenticate = require('./logic/authenticate')
const data = require('./data')

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})



app.post('/authenticate', (req, res) => {
    let body = ''
    req.on('data', chunk => {
        body += chunk
    })
    req.on('end', () => {
        // DO something with body (debug here, analise it, parse it... etc)
        console.log('body =>', body)
        res.end()
    })
})