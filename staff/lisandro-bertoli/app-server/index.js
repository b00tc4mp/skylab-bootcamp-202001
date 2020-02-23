const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const { loggerMidWare, logger } = require('./utils')

const {
    Home,
    App,
    Register,
    Login,
    Landing
} = require('./components')

const {
    retrieveUser,
    registerUser,
    authenticateUser,
    searchVehicles,
    retrieveVehicle,
    toggleFavVehicle,
    retrieveFavorites
} = require('./logic')


const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

logger.level = logger.DEBUG
logger.path = path.join('./server.log')

logger.debug('setting up server')

const app = express()

const { argv: [, , port = 8080] } = process


app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }))


app.get('/', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'Landing', body: Landing(), acceptCookies }))
})

app.get('/register', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'Register', body: Register(), acceptCookies }))
})

app.post('/register', urlencodedBodyParser, (req, res) => {
    const { name, surname, username, password } = req.body
    try {
        registerUser(name, surname, username, password, (error, ) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
            }

            res.redirect('/login')
        })

        res.redirect('/login')
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
    }
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
                const { session: acceptCookies } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            retrieveUser(token, (error, user) => {
                if (error) {
                    const { message } = error
                    const { session: acceptCookies } = req

                    return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))

                }

                session.token = token


                const { username } = user

                session.username = username

                res.redirect(`/home/${username}`)

            })

        })

    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})

app.get('/home/:username', (req, res) => {
    const { params: { username }, session: { token } } = req
    try {

        retrieveUser(token, (error, user) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            const { username: _username } = user

            req.session.user = user

            if (username === _username) {
                const { name } = user
                const { session: { acceptCookies } } = req

                res.send(App({ title: 'Home', body: Home({ name }), acceptCookies }))

            } else redirect('./login')
        })

    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})

app.get('/search/:favs?', (req, res) => {
    const { query: { q: _query }, session: { acceptCookies, token, user: { name } } } = req

    try {
        const { params: { favs } } = req
        if (favs) {

            retrieveFavorites(token, (error, favorites) => {
                if (error) {
                    const { message } = error

                    return res.send(App({ title: 'Home', body: Home({ error: message, name }), acceptCookies }))
                }

                res.send(App({ title: 'Home', body: Home({ vehicles: favorites, name }), acceptCookies }))
            })
        } else {
            searchVehicles(token, _query, (error, vehicles) => {
                if (error) {
                    const { message } = error

                    return res.send(App({ title: 'Home', body: Home({ error: message, name }), acceptCookies }))
                }

                req.session.query = _query

                res.send(App({ title: 'Home', body: Home({ vehicles, name }), acceptCookies }))
            })

        }
    } catch ({ message }) {
        res.send(App({ title: 'Home', body: Home({ error: message, name }), acceptCookies }))
    }
})

app.get('/vehicle/:id', (req, res) => {
    const { params: { id }, session: { token, acceptCookies } } = req
    try {
        retrieveVehicle(token, id, (error, vehicle) => {
            if (error) {
                const { message } = error

                return res.send(App({ title: 'Home', body: Home({ error: message }), acceptCookies }))
            }
            const { session: { user: { name } } } = req

            res.send(App({ title: 'Details', body: Home({ vehicle, name }), acceptCookies }))

        })
    } catch ({ message }) {
        console.log(message)
    }
})

app.post('/toggle-favorite/:id', urlencodedBodyParser, (req, res) => {
    const { session: { token }, params: { id } } = req

    try {
        toggleFavVehicle(token, id, error => {
            if (error) {
                logger.warn(error)
                return res.redirect(req.get('referer'))
            }

            res.redirect(req.get('referer'))
        })
    } catch (error) {
        logger.warn(error)
        return res.redirect(req.get('referer'))
    }
})

app.get('/return', (req, res) => {
    const { session: { query } } = req

    res.redirect(`/search?q=${query}`)
})

app.post('/logout', urlencodedBodyParser, ({ session }, res) => {
    session.destroy(() => res.redirect('/login'))
})

app.post('/accept-cookies', (req, res) => {
    const { session } = req

    session.acceptCookies = true

    res.redirect(req.get('referer'))
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))


process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)
    process.exit(0)
})