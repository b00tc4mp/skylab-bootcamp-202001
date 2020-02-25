const express = require('express')
const { logger, loggerMidWare } = require('./utils')
const path = require('path')
const { authenticateUser, retrieveUser, registerUser, searchVehicles, retrieveVehicle, retrieveStyle, toggleFavVehicle } = require('./logic')
const bodyParser = require('body-parser')
const session = require('express-session')
const { Login, App, Home, Register, Landing, Search, Results, Detail} = require('./components')

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.FATAL
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components'))) // NOTE to see sass files in browser
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: true }))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'components'))

app.get('/', ({ session: { acceptCookies } }, res) => {
    res.send(App({ title: 'My App', body: Landing(),search: Search(), acceptCookies }))
})

app.get('/login', (req, res) => {
    const { session: { username } } = req

    if (username) return res.redirect(`/home/${username}`)

    const { session: { acceptCookies } } = req

    //res.send(App({ title: 'Login', body: Login(), acceptCookies }))+
    res.render('login', {acceptCookies})
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

                //res.redirect(`/home/${username}`)

                session.token = token

                session.save(() => {
                const { fav } = session

                if (fav) return res.redirect(307, `/toggle-fav/${fav}`)

                res.redirect(`/home/${username}`)
            })
            })
            
        })
    } catch ({ message }) {
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
    }
})

app.get('/home/:username', (req, res) => {
    const { params: { username }, session: { token } } = req

    retrieveUser(token, (error, user) => {
        if (error) {
            const { message } = error
            const { session: { acceptCookies } } = req

            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
        }

        const { username: _username } = user

        if (username === _username) {
            const { name } = user

            const { session: { acceptCookies } } = req

            res.send(App({ title: 'Home', body: Home({ name, username }),search: Search(), acceptCookies }))
        } else res.redirect('/login')
    })
})

app.post('/logout', urlencodedBodyParser, ({ session }, res) => {
    session.destroy(() => res.redirect('/login'))
})

app.post('/register', urlencodedBodyParser, (req, res) => {
    const { body: { name, surname, username, password } } = req

    try{
        
        registerUser(name, surname, username, password,(error) => {
            if(error){
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))
            }else{
                const { session: { acceptCookies } } = req
                res.send(App({ title: 'Login', body: Login(), acceptCookies }))
            }
        })

    }catch({message}){
        const { session: { acceptCookies } } = req

        res.send(App({ title: 'Register', body: Register({ error: message }), acceptCookies }))

    }
})

app.get('/register', ({ session: { acceptCookies } }, res) => {
    //res.send(App({ title: 'Register', body: Register(), acceptCookies }))
    res.render('register', {acceptCookies})
})

app.get('/search' ,(req, res) => {
    const { params: {name, username}, session: { token }, query: { query } } = req
    
    searchVehicles(token, query, (error, vehicles) => {
        
        const { query: { query }, session: { token } } = req

        if (token) {
            retrieveUser(token, (error, user) => {
                if (error) {
                    const { message } = error
                    const { session: { acceptCookies } } = req

                    return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                }

                const { name, username } = user

                try {
                    searchVehicles(token, query, (error, vehicles) => {
                        const { session: { acceptCookies } } = req

                        if (error) {
                            const { message } = error

                            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                        }

                        //res.send(App({ title: 'Search', body: Landing({ name, username, query, results: vehicles }), acceptCookies }))
                        res.send(App({ title: 'Home', body: Home({ username, name }),search: Search(),results: Results({vehicles}) , acceptCookies }))
                    })
                } catch ({ message }) {
                    const { session: { acceptCookies } } = req

                    res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies })) // ?
                }
            })
        } else
            try {
                searchVehicles(undefined, query, (error, vehicles) => {
                    const { session: { acceptCookies } } = req

                    if (error) {
                        const { message } = error

                        return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
                    }

                    //res.send(App({ title: 'Search', body: Landing({ query, results: vehicles }), acceptCookies }))
                    res.send(App({ title: 'Home', body: Home({ username, name }),search: Search(),results: Results({vehicles}) , acceptCookies }))
                })
            } catch ({ message }) {
                const { session: { acceptCookies } } = req

                res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies })) // ?
            }
            
        })
})

app.get('/detail/:id', (req, res) =>{
    const { params: { name ,username }, session: { token } } = req
    const id = req.params.id
    debugger
    if (token) {
        retrieveUser(token, (error, user) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            const { name, username } = user
            
            try{

            retrieveVehicle(token, id, (error, vehicle) => {
                if(error){
                    const { message } = error
                    const { session: {acceptCookies} } = req
        
                    return res.send(App({ title: 'Home', body: Home({ username }),search: Search(),results: Results({error: message}) , acceptCookies }))
                }
                retrieveStyle(vehicle.style, (error,style) => {
                    if(error){
                        const { message } = error
                        const { session: {acceptCookies} } = req
        
                        return
                    }
                    const { session: { acceptCookies } } = req
                
                    res.send(App({ title: 'Home', body: Home({ name, username }),search: Search(), detail: Detail({vehicle, style}), acceptCookies }))
                })
            })
        
            } catch({message}){
            const { session: { acceptCookies } } = req

            return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            
            }
        })
    }

    else {
        try{
            retrieveVehicle(undefined, id, (error, vehicle) => {
                if(error){
                        const { message } = error
                        const { session: {acceptCookies} } = req
            
                        return //res.send(App({ title: 'Home', body: Home({ username }),search: Search(),results: Results({error: message}) , acceptCookies }))
                }
                    retrieveStyle(vehicle.style, (error,style) => {
                        if(error){
                            const { message } = error
                            const { session: {acceptCookies} } = req
            
                            return
                        }
                        const { session: { acceptCookies } } = req
                    
                        res.send(App({ title: 'Home', body: Home({}),search: Search(), detail: Detail({vehicle, style}), acceptCookies }))
                    })
            
                })
            } catch({message}){
                return
            }
        } 
       
})

app.post('/toggle-fav/:id', (req, res) => {
    const { params: { id }, session } = req

    const { token } = session

    if (!token) {
        session.referer = req.get('referer')

        session.fav = id
        return session.save(() => res.redirect('/login'))
    }

    try {
        console.log(id)
        toggleFavVehicle(token, id, error => {
            if (error) {
                // ?

                console.log(error)
            }

            const { referer = req.get('referer') } = session

            delete session.referer
            delete session.fav

            session.save(() => res.redirect(referer))
        })
    } catch ({ message }) {
        // ?
        console.log({message})
    }
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