const express = require('express')
const logger = require('./utils/logger')
const path = require('path')
const loggerMidWare = require('./utils/logger-mid-ware')
const register = require('./logic/register')
const authenticate = require('./logic/authenticate')
const users = require('./data')
const bodyParser = require('./utils/body-parser')
const fs = require('fs')

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')
logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)

app.use(express.static(path.join(__dirname, 'public')))

app.post('/login', bodyParser, (req, res) => {

    try {
        const { username, password } = req.body
        authenticate(username, password)

        res.send(`<h1>Welcome ${username}<h1>`)

    } catch (error) {
        res.status(401).send("<h1>401, Wrong Credentials!</h1>\n<a href='/login.html'>Go to Login<a><a href='/register.html'>Go to Register<a>")
    }
})

app.post('/register', bodyParser, (req, res) => {

    try {
        const { name, surname, username, password } = req.body
        register(name, surname, username, password)

    } catch (error) {
        res.status(401).send(`<h1>Error: ${error.message}</h1>\n<a href='/login.html'>Go to Login<a><a href='/register.html'>Go to Register<a>`)
    }
    res.sendFile(path.join(__dirname+'/public/login.html'))
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})

