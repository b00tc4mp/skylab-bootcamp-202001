const express = require('express')
const register = require('./logic/register')
const users = require('./data')

const app = express()

app.use(express.static('public'));
app.use(express.static('logic'));
// app.use(express.static('utils'));

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
        });
        let name = _body[0]
        let surname = _body[1]
        let username = _body[2]
        let password = _body[3]

        register(name, surname, username, password)
        res.redirect('/')
        res.end()
    })
})

app.listen(8080, function () {
    console.log('server up')
});