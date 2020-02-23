const express = require('express')
const { logger, loggerMidWare } = require('./utils')
const path = require('path')
const { authenticateUser, retrieveUser, registerUser, searchVehicles, retrieveVehicle, toggleFavVehicle, retrieveFavVehicles } = require('./logic')
const bodyParser = require('body-parser')
const session = require('express-session')
const { Login, App, Search, Register, Results, Item, Details, Favorites, Landing } = require('./components')

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

app.get('/', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
})

app.get('/login', (req, res) => {
    const { session: { username } } = req

    if (username) return res.redirect(`/search/${username}`)

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
            debugger
            res.send(App({ title: 'Search', body: Search({ name, username }), acceptCookies }))
        } else res.redirect('/login')
    })
})

app.get('/search', (req, res) => {
    const { query: {query}, session: { token, acceptCookies, name, username } } = req
    req.session.query = query

    try {
        searchVehicles ( token, query, (error, vehicles) => {
            if (error) {
                const { message } = error

                return res.send(App({ title: 'Search', body: Search({ name, username, error: message }), acceptCookies }))
            }
            res.send(App({ title: 'Search', body: Search({ name, username, vehicles }), acceptCookies }))
        })
    }catch( {message} ){
        return res.send(App({ title: 'Search', body: Search({ name, username, error: message }), acceptCookies }))
    }

})

app.get('/vehicle/:id' , (req, res) => {
    const { session: { token, acceptCookies, query }, params: { id } } = req

    try{
        retrieveVehicle(token, id, (error, vehicle) => {
            if(error) {
                const { message } = error
                return res.send(App({ title: 'Search', body: Search ({  name, username, error: message }), acceptCookies }))
            } 
            res.send(App({ title: 'Search', body: Details({ vehicle, query}), acceptCookies }))
        })
    }catch ({message} ){
        res.send(App({ title: 'Details', body: Details({ vehicle, query, error: message }), acceptCookies }))
    }
    
})

app.get('/*/fav/:id', (req, res) => {
    const { session: { name, username, token, acceptCookies, query }, params: { id } } = req

    try {
        toggleFavVehicle (token, id, error => {
            if(error) {
                const { message } = error
                return res.send(App({ title: 'Search', body: Search ({  name, username, error: message }), acceptCookies }))
            }
            res.redirect(req.get('referer'))
        })
    } catch ({error}){
        res.send(App({ title: 'Search', body: Search ({  name, username, error: message }), acceptCookies }))
    }
})

app.get('/favorites/:username', (req, res) => {
    const { session: { name, username, token, acceptCookies, query }, params: { id }} = req

    try{
        retrieveFavVehicles(token, (error, favsList) => {
            if (error) {
                const { message } = error
                return res.send(App({ title: 'Search', body: Search ({  name, username, error: message }), acceptCookies }))
            }
            res.send(App({ title: 'Favorites', body: Favorites ({ favsList }), acceptCookies }))
        })
    }catch({message}){
        res.send(App({ title: 'Search', body: Search ({  name, username, error: message }), acceptCookies }))
    }

})

app.post('/logout', urlencodedBodyParser, ({ session }, res) => {
    session.destroy(() => res.redirect('/login'))
})

app.post('/register', urlencodedBodyParser, (req, res) => {
    const { body: { name, surname, username, password } } = req

    try {
        registerUser(name, surname, username, password, (error)=> {
            if(error){
                const {message} = error 
                const { session: { acceptCookies } } = req
                
                return res.send(App( { title: 'Register', body: Register({ error: message }), acceptCookies}))
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

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})