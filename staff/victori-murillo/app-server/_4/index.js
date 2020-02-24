const express = require('express')
const { logger, loggerMidWare } = require('./utils')
const path = require('path')
const { authenticateUser, retrieveUser, registerUser, searchVehicles, retrieveVehicle, toggleFavVehicle } = require('./logic')
const bodyParser = require('body-parser')
const session = require('express-session')
const { Login, App, Search, Register, Landing, Detail } = require('./components')
const url  = require("url")

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components'))) // NOTE to see sass files in browser
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }))

app.get('/', ({ session: { acceptCookies, token } }, res) => {
    try {

        if (token) {  
            retrieveUser(token, (error, {username}) => {
                if (error) return res.send(App({ title: 'My App', body: Landing(), acceptCookies }))

                if (username)
                    res.redirect(`/search/${username}`)
                else
                    res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
            })

        } else res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
        
    } catch (error) {
        res.send(App({ title: 'My App', body: Landing(), acceptCookies })) // ?
    }
})

app.get('/login', (req, res) => {
    const { session: { acceptCookies } } = req

    try {
        const { session: { username } } = req
        if (username) return res.redirect(`/search/${username}`)
        res.send(App({ title: 'Login', body: Login(), acceptCookies }))
        
    } catch ({message}) {
        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
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
    const {query} = url.parse(req.url, true).query

    try {
        retrieveUser(token, (error, user) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req
    
                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }
    
            const { username: _username } = user
    
            if (username === _username) {
                const { session: { acceptCookies } } = req
    
                if (query) {
                    searchVehicles(token, query, (error, vehicles) => {
                        if (error) {
                            const { message } = error
                            const { session: { acceptCookies } } = req
                            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                        }
            
                        res.send(App({ title: 'search', body: Search({ username, query, vehicles }), acceptCookies }))
                    })
    
                } else res.send(App({ title: 'search', body: Search({ username}), acceptCookies }))
    
            } else res.redirect('/login')
        })
        
    } catch ({message}) {
        const { session: { acceptCookies } } = req
        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }

})

app.get('/vehicles/:vehicle', (req, res) => {
    const { params: { vehicle: id }, session: { token, acceptCookies } } = req
    
    try {
        retrieveVehicle(token, id, (error, vehicle) => {
            if (error) {
                const { message } = error
                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }
            res.send(App({ title: 'detail', body: Detail({ vehicle }), acceptCookies }))
        })
        
    } catch ({message}) {
        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})



app.get('/logout', urlencodedBodyParser, ({ session }, res) => session.destroy(() => res.redirect('/login')))

app.post('/register', urlencodedBodyParser, (req, res) => {
    const { body: { name, surname, username, password } } = req

    try {
        registerUser(name, surname, username, password, error => {
             if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
            }

            res.redirect('/login')
        })

    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
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

app.get('/toggleFav/:vehicle', (req, res) => {
    const {session: { token, acceptCookies }, params: {vehicle: id}} = req

    try {
        toggleFavVehicle(token, id, error => {
            if (error) {
                const { message } = error
                return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
            }
            res.redirect(req.get('referer'))
        })
        
    } catch (error) {
        if (error) {
            const { message } = error
            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
        }
        
    }

})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})