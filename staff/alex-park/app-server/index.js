const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const { logger, loggerMidWare } = require('./utils')
const { login, loginPost, search, results, details, toggleFav, favsList, logout, registerPost, register, acceptCookies } = require('./routes')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.INFO
logger.path = path.join(__dirname, 'server.log')

const app = express()

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components')))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }))

app.get('/', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
})

app.get('/login', login)

app.post('/login', urlencodedBodyParser, loginPost)

app.get('/search/:username', search)

app.get('/vehicles', results)

app.get('/vehicle/:id', urlencodedBodyParser, details)

app.get('*/fav/:id', toggleFav)

app.get('/favs-list/:username', favsList)

app.post('/logout', urlencodedBodyParser, logout)

app.post('/register', urlencodedBodyParser, registerPost)

app.get('/register', register)

app.post('/accept-cookies', acceptCookies)

logger.debug('setting up server')
app.listen(port, () => { logger.info(`Successfully connected to server on port ${port}`) })