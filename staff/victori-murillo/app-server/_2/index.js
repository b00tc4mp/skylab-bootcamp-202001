const express = require('express')
const logger = require('./utils/logger')
const path = require('path')
const loggerMidWare = require('./utils/logger-mid-ware')
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

app.use(loggerMidWare)
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    const {token} = req.cookies

    if (!token) res.send(App({ title: 'My App', body: Landing() }))
    else res.redirect(`/home/${token}`)
})


app.get('/login', (req, res) => {
    const {token} = req.cookies

    if (!token) {
        res.send(App({ title: 'Login', body: Login() }))

    } else res.redirect(`/home/${token}`)
})

app.use(urlencodedBodyParser)

app.post('/authenticate', (req, res) => {
    const { username, password } = req.body

    try {
        authenticateUser(username, password)

        let options = {
            maxAge: 1000 * 60 * 5, // would expire after 15 minutes
            httpOnly: true, // The cookie only accessible by the web server
            // signed: true // Indicates if the cookie should be signed
        }
        
        res.cookie('token', username, options)

        sessions.push(username)

        res.redirect(`/home/${username}`)
    } catch ({ message }) {
        res.send(App({ title: 'Login', body: Login({ error: message }) }))
    }
})

app.get('/home/:username', (req, res) => {
    const { params: { username }, cookies: {token} } = req
        
    if (token === username && sessions.includes(username)) {
        const { name } = retrieveUser(username)

        res.send(App({ title: 'Home', body: Home({ name, username }) }))

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

app.listen(port, () => logger.info(`server up and running on port ${port}`))



process.on('SIGINT', () => {
    

    logger.warn(`server abruptly stopped`)

    process.exit(0)
})