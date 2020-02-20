const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { loggerMidWare, logger, cookieParserMidWare } = require('./utils')
const { Home, App, Register, Login, Landing } = require('./components')
const { retrieveUser, registerUser, authenticateUser } = require('./logic')
const { sessions } = require('./data')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

logger.level = logger.DEBUG
logger.path = path.join('./server.log')

logger.debug('setting up server')

const app = express()

const { argv: [, , port = 8080] } = process

app.use(loggerMidWare)
app.use(cookieParserMidWare)

app.use(urlencodedBodyParser)


app.get('/', (req, res) => {
    const { cookies: { username } } = req

    if (sessions.includes(username)) return res.redirect(`/home/${username}`)

    res.send(App({ title: 'Landing', body: Landing() }))
})

app.get('/register', (req, res) => {
    const { cookies: { username } } = req

    if (sessions.includes(username)) return res.redirect(`/home/${username}`)

    res.send(App({ title: 'Register', body: Register() }))
})

app.get('/login', (req, res) => {
    const { cookies: { username } } = req

    if (sessions.includes(username)) return res.redirect(`/home/${username}`)

    res.send(App({ title: 'Login', body: Login() }))
})
app.get('/home/:username', (req, res) => {
    const { params: { username } } = req

    const { name } = retrieveUser(username)

    res.send(App({ title: 'Home', body: Home({ name }) }))
})

app.post('/register', (req, res, next) => {
    const { name, surname, username, password } = req.body

    try {
        registerUser(name, surname, username, password)

        res.redirect('/login')
    } catch ({ message }) {
        res.send(App({ title: 'Register', body: Register({ error: message }) }))
    }
})


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

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)
    process.exit(0)
})