
const express = require('express')
//const logger = require('./utils/logger')
const path = require('path')
//const loggerMidWare = require('./utils/logger-mid-ware')
const authenticate = require('./logic/authenticate')
const register = require('./logic/register')
const data = require('./utils/data')
const fs = require("fs")

const { argv: [, , port = 8080] } = process

// logger.level = logger.DEBUG
// logger.path = path.join(__dirname, 'server.log')

// logger.debug('setting up server')

const app = express()

// app.use(loggerMidWare)

//app.use(staticMidWare(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))

app.post('/authenticate', (req, res) => {
    
})

app.listen(port, () => console.log(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})