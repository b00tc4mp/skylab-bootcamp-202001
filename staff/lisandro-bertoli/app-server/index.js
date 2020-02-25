const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const { loggerMidWare, logger } = require('./utils')
const { landing,
    register,
    registerPost,
    login,
    loginPost,
    search,
    detail,
    toggleFav,
    goBack,
    logout,
    acceptCookies,
    favorites
} = require('./routes')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

logger.level = logger.DEBUG
logger.path = path.join('./server.log')

logger.debug('setting up server')

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'components'))

const { argv: [, , port = 8080] } = process


app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 1000 * 1000 * 24 }, resave: false, saveUninitialized: true }))


app.get('/', landing)

app.get('/register', register)

app.post('/register', urlencodedBodyParser, registerPost)

app.get('/login', login)

app.post('/login', urlencodedBodyParser, loginPost)

app.get('/search', search)

app.get('/vehicle/:id', detail)

app.post('/toggle-favorite/:id', urlencodedBodyParser, toggleFav)

app.get('/favorites', favorites)

app.get('/return/:favorites?', goBack)

app.post('/logout', urlencodedBodyParser, logout)

app.post('/accept-cookies', acceptCookies)

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)
    process.exit(0)
})