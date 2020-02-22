const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const { logger, loggerMidWare } = require('./utils')
const { authenticateUser, registerUser, retrieveUser, searchVehicles, retrieveVehicle } = require('./logic')
const { Login, App, Home, Register, Landing, Search, Details } = require('./components')

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

app.get('/login', (req, res) => {
    const { session: { username } } = req

    if (username) return res.redirect(`/home/${username}`)

    const { session: { acceptCookies } } = req

    res.send(App({ title: 'Login', body: Login(), acceptCookies }))
})

app.post('/login', urlencodedBodyParser, (req, res) => {
    const { body: { username, password }, session } = req

    try {
        authenticateUser(username, password, (error, token) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            retrieveUser(token, (error, user) => {
                if (error) {
                    const { message } = error
                    const { session: { acceptCookies } } = req

                    return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                }

                session.token = token

                const { username } = user

                res.redirect(`/search/${username}`)
            })
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})

app.get('/search/:username', (req, res) => {
    const { params: { username }, session: { token } } = req

    retrieveUser(token, (error, user) => {
        if (error) {
            const { message } = error
            const { session: { acceptCookies } } = req

            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
        }

        const { username: _username } = user
        req.session.name = user.name
        req.session.username = user.username

        if (username === _username) {
            const { name } = user
            const { session: { acceptCookies } } = req

            res.send(App({ title: 'Search', body: Search({ name, username }), acceptCookies }))
        } else res.redirect('/login')
    })
})

app.get('/query-search', (req, res) => {
    const { query: { query }, session: { token, acceptCookies, name, username } } = req
    req.session.query = query
    
    try {
        searchVehicles(token, query, (error, vehicles) => {
            if (error) {
                const { message } = error
    
                return res.send(App({ title: 'Search', body: Search({ error: message, name, username }), acceptCookies }))
            } else {
                return res.send(App({ title: 'Search', body: Search({ name, username, vehicles }), acceptCookies }))
            }
        })
    } catch({ message }) {
        return res.send(App({ title: 'Search', body: Search({ error: message, name, username }), acceptCookies }))}
})

app.get('/vehicle/:id', urlencodedBodyParser, (req, res) => {
    const { session: { token, acceptCookies, query }, params: { id } } = req
    
    retrieveVehicle(token, id, (error, vehicle) => {
        if (error) {
            //
        } else {
            res.send(App({ title: 'Details', body: Details({ vehicle, query }), acceptCookies }))
        }
    })
})

app.post('/logout', urlencodedBodyParser, ({ session }, res) => {
    session.destroy(() => res.redirect('/login'))
})

app.post('/register', urlencodedBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body

    try {
        registerUser(name, surname, username, password, error => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
            } else {
                res.redirect('/login')
            }
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
    }
})

app.get('/register', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'Register', body: Register(), acceptCookies }))
})

app.post('/accept-cookies', (req, res) => {
    const { session } = req 
    session.acceptCookies = true

    res.redirect(req.get('referer'))
})

logger.debug('setting up server')
app.listen(port, () => { logger.info(`Successfully connected to server on port ${port}`) })
process.on('SIGINT', () => { logger.warn(`server abruptly stopped`); process.exit(0) })