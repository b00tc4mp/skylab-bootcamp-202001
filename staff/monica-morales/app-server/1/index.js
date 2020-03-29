const express = require('express')
const { logger, loggerMidWare } = require('./utils')
const path = require('path')
const { authenticateUser, retrieveUser, registerUser, searchVehicles, retrieveVehicle, toggleFavVehicle } = require('./logic')
const bodyParser = require('body-parser')
const session = require('express-session')
const { Login, App, Search, Register, Landing, Results, Item, Detail } = require('./components')
const {landing, login, loginPost, search, logout, registerPost, register} = require ('./routes')



const urlencodedBodyParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'components'))

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/components', express.static(path.join(__dirname, 'components'))) // NOTE to see sass files in browser
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1000*60*60*24 }, resave: false, saveUninitialized: true }))

app.get('/', landing)

app.get('/login',login)

app.post('/login', urlencodedBodyParser, loginPost)

app.get('/search', search)

app.post('/logout', urlencodedBodyParser, logout)

app.post('/register', urlencodedBodyParser, registerPost)

app.get('/register', register)

app.get('/detail/:id', (req, res) =>{
    const { session: { acceptCookies, token }, params:{id} } = req
    
    retrieveVehicle(token, id,(error, detail)=>{
        if(error)
        res.redirect(req.get('referer'))
        if(detail)
        res.send(App({title: `${detail.name}`, body:Detail({detail}), acceptCookies}))
    })

    
})
app.get('/back', (req, res)=>{
    const {session: {query}}=req
    res.redirect(`/search?query=${query.query}`)
})

app.post('/accept-cookies', (req, res) => {
    const { session } = req

    session.acceptCookies = true

    res.redirect(req.get('referer'))
})

app.post('/toggle-fav/:id', (req,res)=>{
    const {params: {id}, session} = req 

    const {token} = session

    if(!token){
        session.refere = req.get('referer')
        session.fav = id

        return session.save(()=>res.redirect('/login'))

    }
    try {
        toggleFavVehicle(token, id, error =>{
            if(error){
                return error
            }
            const {referer = req.get('referer')} = session
            
            delete session.referer
            delete session.fav

            session.save(()=> res.redirect(referer))
        })
    } catch (error) {
        
    }
})

app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})