const express = require("express")
const {logger, loggerMidWare, /*wait*/} = require ("./utils")
const path = require("path")
const {authenticateUser, retrieveUser, registerUser, searchVehicles, toogleFavVehicle} = ("./logic")
const bodyParser = require('body-parser')
const session = require('express-session')
const { Login, App, Register, Landing, Search, Results } = require('./components')
const FileStore = require('session-file-store')(session)

const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)
app.use(express.static(path.join(_dirname, 'public'))) //Mirar bien lo de static
app.use('/components', express.static(path.join(__dirname, 'components'))) // Para ver sass files in browser
app.use(session({
    secret: 'my grandmas dad had a second life',
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
    saveUninitialized: true,
    store: new FileStore({})
}))


app.get('/', ({ session: { token, acceptCookies } }, res) => {
    if (token) {
        retrieveUser(token, (error, user) => {
            if (error) {
                const { message } = error
                const { session: { acceptCookies } } = req

                return res.send(App({ title: 'Login', body: Login({ error: message }), acceptCookies }))
            }

            const { name, username } = user

            res.send(App({ title: 'My App', body: Landing({ name, username }), acceptCookies }))
        })
    } else res.send(App({ title: 'My App', body: Landing(), acceptCookies }))
})

app.get("/login", (req, res)=> {
    const {session : { username}} = req
    if (username) return res.redirect(`/home/${username}`)
    const {session : {acceptCookies}} = req
    res.send(App({ title: 'Login', body: Login(), acceptCookies}))
})

app.post("/login", urlencodedBodyParser, (req, res) => { // Para que el body sea parseado
    const { body: { username, password }, session } = req
    try { authenticateUser(username, password, (error, token)=> {
        if(error){
            const {message} = error
            const { session: {acceptCookies}} = req
            return res.send(App({title: 'Login', body: Login({error: message}), acceptCookies}))
        }
        session.token = token
        session.save(() => {
            const {fav} = session
            if(fav) return res.redirect(307, `/toogle-fav/${fav}`)

            res.redirect('/')

            }
        })
    