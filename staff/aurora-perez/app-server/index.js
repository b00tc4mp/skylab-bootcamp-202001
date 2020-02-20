const express = require('express')
const path = require('path')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const authenticate = require('./logic/authenticate')
const register = require('./logic/register')
const retrieveUser = require('./logic/retrieve-user')
const users = require('./utils/data')
const fs = require('fs')

const { argv: [, , port = 8080] } = process

logger.level=logger.DEBUG
logger.path = path.join(__dirname, 'server.log')

const app = express()

app.use(loggerMidWare)

app.use(express.static(path.join(__dirname, 'public')))

app.post('/authenticate', (req, res, next) => {
    //formdata = () => { TODO
        let data = ''

        req.on('data', chunk => {
            data += chunk
        })
        
        req.on('end', () => {

            let body = {}

            data.split('&').forEach(element => {
                //const [key, value] = element.split('=')
                const key = element.split('=')[0]
                const value = element.split('=')[1]
                body[key]=value
            })
            req.body = body
            
            next()

        })
    //}
}, (req, res)=>{
    try {
        const {body: {username, password} } = req
            authenticate(username, password)
            
            //var ws = fs.createWriteStream(path.join(__dirname, 'public/index.html'))

            retrieveUser(username)

            res.send(`<h1>Hello ${username} </h1>`)

            //const rs = fs.createReadStream(path.join(__dirname, 'public/index.html'))
           
            // rs.on('open', function () {
            //     rs.pipe(res);
            // })
            
    }catch(error){
        const rs = fs.createReadStream(path.join(__dirname, 'public/login-wrong.html'))
        rs.on('open', function () {
                rs.pipe(res);
        })

    }
   
})

app.post('/register', (req, res, next) => {
    //formdata = () => { TODO
        let data = ''

        req.on('data', chunk => {
            data += chunk
        })

        req.on('end', () => {
            // DO something with body (debug here, analise it, parse it... etc)

            let body = {}

            data.split('&').forEach(element => {
                const key = element.split('=')[0]
                const value = element.split('=')[1]
                body[key]=value
            })
            req.body = body
            
            next()

        })
    //}
}, (req, res)=>{
    try {
        const {body: {name, surname, username, password} } = req
            register(name, surname, username, password)

            const rs = fs.createReadStream(path.join(__dirname, 'public/login.html'))
            //res.end(path.join(__dirname, 'public/index.html'))
            //debugger
            rs.on('open', function () {
                rs.pipe(res);
            })
            
    }catch(error){
        const rs = fs.createReadStream(path.join(__dirname, 'public/register-wrong.html'))
        rs.on('open', function () {
                rs.pipe(res);
        })

    }
   
})



app.listen(port, () => logger.info(`server up and running on port ${port}`))

process.on('SIGINT', () => {
    logger.warn(`server abruptly stopped`)

    process.exit(0)
})