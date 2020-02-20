const express = require('express')
const path = require('path')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const parserMidWare = require('./utils/parser-mid-ware')
const authMidWare = require('./utils/authenticate-mid-ware')
const registerMidWare = require('./utils/register-mid-ware')

logger.level = logger.DEBUG
logger.path = path.join('./server.log')

logger.debug('setting up server')

const app = express()

const { argv: [, , port = 8080] } = process

app.use(loggerMidWare)

app.use(express.static(path.join(__dirname, 'public')))

app.use(parserMidWare)
app.use('/authenticate', authMidWare)
app.use('/register', registerMidWare)


app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)
    process.exit(0)
})
