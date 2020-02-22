const express = require('express')
const { logger, loggerMidWare, cookieParserMidWare } = require('./utils')
const path = require('path')
const { authenticateUser, retrieveUser, registerUser } = require('./logic')
const bodyParser = require('body-parser')
const { Login, App, Home, Register, Landing } = require('./components')
const { sessions } = require('./data')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)
app.use(cookieParserMidWare)

app.use(express.static(path.join(__dirname, 'public')))//ahora no tiene sentido

app.get('/', (req, res) => {
    res.send(App({ title: 'My App', body: Landing() }))
})

app.get('/login', (req, res) => {
    const { cookies: { username } } = req

    if (sessions.includes(username)) return res.redirect(`/home/${username}`)

    res.send(App({ title: 'Login', body: Login() }))
})

app.use(urlencodedBodyParser)

app.post('/login', (req, res) => {
    const { username, password } = req.body
    try {
        authenticateUser(username, password)

        sessions.push(username)

        const { cookies: { username: _username } } = req

        username !== _username && res.setHeader('set-cookie', `username=${username}`)

        res.redirect(`/home/${username}`)
    } catch ({ message }) {
        res.send(App({ title: 'Login', body: Login({ error: message }) }))
    }
})


app.get('/home/:username', (req, res) => {
    const { params: { username } } = req

    if (sessions.includes(username)) {
        const { name } = retrieveUser(username)

        const { cookies: { username: _username } } = req

        username !== _username && res.setHeader('set-cookie', `username=${username}`)

        res.send(App({ title: 'Home', body: Home({ name, username }) }))
    } else res.redirect('/login')
})

app.post('/logout', (req, res) => {
    const { body: { username } } = req

    const index = sessions.indexOf(username)

    sessions.splice(index, 1)

    res.clearCookie('username')

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

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})