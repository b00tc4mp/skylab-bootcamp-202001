const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const { loggerMidWare, logger } = require('./utils')
const { Home, App, Register, Login, Landing } = require('./components')
const { retrieveUser, registerUser, authenticateUser } = require('./logic')


const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

logger.level = logger.DEBUG
logger.path = path.join('./server.log')

logger.debug('setting up server')

const app = express()

const { argv: [, , port = 8080] } = process

app.use(loggerMidWare)
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }))

app.get('/', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'Landing', body: Landing(), acceptCookies }))
})

app.get('/register', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'Register', body: Register(), acceptCookies }))
})

app.get('/login', (req, res) => {
    const { session: { username } } = req

    if (username) return res.redirect(`/home/${username}`)

    const { session: { acceptCookies } } = req

    res.send(App({ title: 'Login', body: Login(), acceptCookies }))
})

app.get('/home/:username', (req, res) => {
    const { params: { username } } = req

    const { name } = retrieveUser(username)



    res.send(App({ title: 'Home', body: Home({ name }) }))
})

app.post('/register', urlencodedBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body
    try {
        registerUser(name, surname, username, password)

        res.redirect('/login')
    } catch ({ message }) {
        res.send(App({ title: 'Register', body: Register({ error: message }) }))
    }
})


app.post('/login', urlencodedBodyParser, (req, res) => {
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

app.post('/logout', urlencodedBodyParser, ({ session }, res) => {
    session.destroy(() => res.redirect('/login'))
})

app.post('/accept-cookies', (req, res) => {
    const { session } = req
    debugger
    session.acceptCookies = true

    res.redirect(req.get('referer'))
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))


process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)
    process.exit(0)
})