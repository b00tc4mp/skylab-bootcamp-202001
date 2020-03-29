const express = require ('express')
const path = require('path')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')

const {argv: [, , port = 8080]} = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

const app = express()

app.use(loggerMidWare));

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port)

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})
