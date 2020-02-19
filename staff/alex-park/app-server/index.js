const express = require('express')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')

const { argv: [ , , port = 8080]} = process

const app = express()

app.use(express.static('public'))
app.use(loggerMidWare)



app.listen(port, () => { logger.info(`Successfully connected to server on port ${port}`) })