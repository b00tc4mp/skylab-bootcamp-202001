const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const { logger, loggerMidWare } = require('./utils')
const { landing, login, loginPost, search, toggleFav, logout, registerPost, register, acceptCookies } = require('./routes')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.INFO
logger.path = path.join(__dirname, 'server.log')

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'components'))

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components')))
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: true,
    store: new FileStore({})
}))

app.get('/', landing)

app.get('/login', login)

app.post('/login', urlencodedBodyParser, loginPost)

app.post('/logout', urlencodedBodyParser, logout)

app.get('/register', register)

app.post('/register', urlencodedBodyParser, registerPost)

app.post('/accept-cookies', acceptCookies)

app.get('/search/', search)

app.post('/toggle-fav/:id', toggleFav)

// app.get('/vehicles', results)

// app.get('/vehicle/:id', urlencodedBodyParser, details)

// app.get('*/fav/:id', toggleFav)

// app.get('/favs-list/:username', favsList)

logger.debug('setting up server')
app.listen(port, () => { logger.info(`Successfully connected to server on port ${port}`) })

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})