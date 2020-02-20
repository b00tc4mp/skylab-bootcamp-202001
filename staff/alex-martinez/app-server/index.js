const express = require('express')
const logger = require('./utils/logger')
const path = require('path')
const loggerMidWare = require('./utils/logger-mid-ware')
const users = require('./data')
const authenticate = require('./logic/authenticate')
const register = require('./logic/register')
require('jasmine')

// const staticMidWare = require('./utils/static-mid-ware')

const { argv: [, , port = 8080] } = process

logger.level = logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

logger.debug('setting up server')

const app = express()

app.use(loggerMidWare)

//app.use(staticMidWare(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public')))


app.post('/register', (req,res)=>{

    let body = ''
    req.on('data', chunk => {
        body += chunk
    })
    
    req.on('end', () => {
        let name = (body.split('=')[1]).split('&')[0]
        let surname = (body.split('=')[2]).split('&')[0]
        let username = (body.split('=')[3]).split('&')[0]
        let password = (body.split('=')[4]).split('&')[0]

        try {
            register(name, surname, username, password)
            
        } catch (error) {
            res.send(`<h1 style="color:red">User already exist</h1>
            <a href="register.html">Go to Register</a> <a href="login.html">Go to Login</a>`)
        }
        res.sendFile(path.join(__dirname+'/public/login.html'))
        //res.redirect('/login.html')
    })
   
})

app.post('/login', (req, res)=>{

    let body = ''
    req.on('data', chunk => {
        body += chunk
    })
    req.on('end', () => {
        // DO something with body (debug here, analise it, parse it... etc)
        let username = (body.split('=')[1]).split('&')[0]
        let password = body.split('=')[2]
        let _name
        for(let i = 0; i<users.length; i++){
            Object.keys(users[i]).forEach((key)=>{if(users[i][key]===username) _name = users[i]['name']})}
        //console.log(users)
        try {
            authenticate(username, password)
            
            res.send(
                `<h1>Welcome ${_name}</h1>`
            )
        } catch (error) {
            //console.error(error)
            res.send(`<h1 style='color:red'>Wrong credentials</h1>
            <a href="register.html">Go to Register</a> <a href="login.html">Go to Login</a>`)
        }
        res.end()
    }) 
})


app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})
