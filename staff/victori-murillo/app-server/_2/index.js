const express = require('express')
const { logger, loggerMidWare, cookieParserMidWare, acceptCookiesMidWare } = require('./utils')
const path = require('path')
const { authenticateUser, retrieveUser, registerUser } = require('./logic')
const bodyParser = require('body-parser')
const { Login, App, Home, Register, Landing } = require('./components')
const { sessions } = require('./data')
const cookieParser = require('cookie-parser')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(loggerMidWare)
app.use(cookieParser())
app.use(urlencodedBodyParser)
app.use(cookieParserMidWare)
app.use(acceptCookiesMidWare)

app.get('/', (req, res) => {
    const { cookies: {token} } = req

    if (!token) {
        const {acceptCookie} = req
        res.send(App({ title: 'My App', body: Landing(), acceptCookie }))
    
    } else res.redirect(`/home/${token}`)
})

app.get('/login', (req, res) => {
    const {token} = req.cookies

    if (!token) {
        const {acceptCookie} = req
        res.send(App({ title: 'Login', body: Login(), acceptCookie }))

    } else res.redirect(`/home/${token}`)
})

app.post('/authenticate', (req, res) => {
    const { username, password } = req.body

    try {
        authenticateUser(username, password)
        res.cookie('token', username)
        sessions.push(username)

        res.redirect(`/home/${username}`)
    } catch ({ message }) {
        const {acceptCookie} = req
        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookie }))
    }
})

app.get('/home/:username', (req, res) => {
    const { params: { username }, cookies: {token} } = req
        
    if (token === username && sessions.includes(username)) {
        const { name } = retrieveUser(username)
        const {acceptCookie} = req
        res.send(App({ title: 'Home', body: Home({ name, username }), acceptCookie }))

    } else if (token === username && !sessions.includes(username)) {
        sessions.push(token)
        res.redirect(`/home/${token}`)
    } else {
        res.redirect('/login')
    }
})

app.post('/logout', (req, res) => {
    const { body: { username } } = req
    res.clearCookie('token')
    res.clearCookie('acceptCookie')

    const index = sessions.indexOf(username)
    sessions.splice(index, 1)
    res.redirect('/login')
})

app.post('/register', (req, res) => {
    const { name, surname, username, password } = req.body
    const {acceptCookie} = req.cookies

    try {
        registerUser(name, surname, username, password)

        res.redirect('/login')
    } catch ({ message }) {
        res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookie: acceptCookie ? "": Cookie()  }))
    }
})

app.post('/cookie', (req, res) => {
    res.cookie('acceptCookie', true)
    res.redirect(req.get('referer'))
})

app.get('/register', (req, res) => {
    const {acceptCookie} = req.cookies
    res.send(App({ title: 'Register', body: Register(), acceptCookie: acceptCookie ? "": Cookie()  }))
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))



process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})