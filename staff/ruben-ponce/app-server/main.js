const express = require('express')
const register = require('./logic/register')
const authenticate = require('./logic/authenticate')
const users = require('./data')

const app = express()

app.use(express.static('public'));
app.use(express.static('logic'));

app.post('/register', (req, res) => {
    let body = ''
    let _body = []
    
    req.on('data', chunk => {
        body += chunk
    })
    req.on('end', () => {
        body = body.split('&')
        body.forEach(data => {
            _body.push(data.split('=')[1])
        })
        let name = _body[0]
        let surname = _body[1]
        let username = _body[2]
        let password = _body[3]

        try {
            register(name, surname, username, password)
            console.log(users)
            res.redirect('/')
            res.end()
        } catch (error) {
            res.end(`<h1>${error}</h1>`)
        }
    })
})

app.post('/login', (req, res) => {
    let body = ''
    let _body = []
    
    req.on('data', chunk => {
        body += chunk
    })
    req.on('end', () => {
        body = body.split('&')
        body.forEach(data => {
            _body.push(data.split('=')[1])
        })
        let username = _body[0]
        let password = _body[1]

        try {
            authenticate(username, password)
            console.log('logged in')
            res.end(`<h1>Welcome ${username}!, now i get your password ${password} :)</h1>`)
        } catch (error) {
            res.end(`<h1>404. ${error}</h1>`)
        }
    })
})

app.listen(8080, function () {
    console.log('server up')
})