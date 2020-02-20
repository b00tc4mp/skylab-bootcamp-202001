const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const { authenticateUser, registerUser, retrieveUser } = require('./logic')
const { Login, App, Home, Register, Landing } = require('./components')
const { sessions } = require('./data')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.INFO
logger.path = path.join(__dirname, 'server.log')

const app = express()

app.use(loggerMidWare)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send(App({ title: 'My App', body: Landing() }))
})

app.get('/login', (req, res) => {
    res.send(App({ title: 'Login', body: Login() }))
})

app.use(urlencodedBodyParser)

app.post('/authenticate', (req, res) => {
    const { username, password } = req.body

    try {
        authenticateUser(username, password)

        sessions.push(username)

        res.redirect(`home/${username}`)
    } catch({ message }) {
        res.send(App({ title: 'Login', body: Login({ error: message }) }))
    }
})

app.get('/home/:username', (req, res) => {
    const { params: { username } } = req

    if (sessions.includes(username)) {
        const { name } = retrieveUser(username)

        res.send(App({ title: 'Home', body: Home({ name, username }) }))
    } else {
        res.redirect('/login')
    }
})

app.post('/logout', (req, res) => {
    const { body: { username } } = req

    const index = sessions.indexOf(username)

    sessions.splice(index, 1)

    res.redirect('/login')
})

app.post('/register', (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        registerUser(name, surname, username, password)

        res.redirect('/login')

    } catch ({ message }) {
        res.send(App({ title: 'Register', body: Register({ error: message }) }))
    }
})

app.get('/register', (req, res) => {
    res.send(App({ title: 'Register', body: Register() }))
})

logger.debug('setting up server')
app.listen(port, () => { logger.info(`Successfully connected to server on port ${port}`) })
process.on('SIGINT', () => { logger.warn(`server abruptly stopped`); process.exit(0) })