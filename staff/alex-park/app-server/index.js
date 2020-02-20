const express = require('express')
let path = require('path')
const fs = require('fs')
const logger = require('./utils/logger')
const loggerMidWare = require('./utils/logger-mid-ware')
const urlencodedBodyParser = require('./utils/urlencoded-body-parser')
const { authenticateUser, registerUser, retrieveUser } = require('./logic')

const { argv: [, , port = 8080] } = process

logger.level = logger.INFO
logger.path = path.join(__dirname, 'server.log')

const app = express()

app.use(loggerMidWare)
app.use(express.static(path.join(__dirname, 'public')))
app.use(urlencodedBodyParser)

app.post('/authenticate', (req, res) => {
    const { username, password } = req.body

    try {
        authenticateUser(username, password)

        const mainUser = retrieveUser(username)

        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing</title>
</head>
<body>
    <h1>Hello, ${mainUser}!</h1>
</body>
</html>`)

    } catch ({ message }) {
        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>LOGIN</h2>
    <form action="/authenticate" method="POST">
        <input type='text' placeholder="Username" name='username'>
        <input type='password' placeholder="Password" name='password'>
        <p style='color: red;'>${message}</p>
        <br>
        <input type='submit' value='Submit'>
        <br>
        <a href='./register.html'>Go to Register</a>
    </form>
</body>
</html>`)
    }
})

app.post('/register', (req, res) => {
    debugger
    const { name, surname, username, password } = req.body
    console.log(req.body)

    res.end()

    try {
        registerUser(name, surname, username, password)

        // res.use('/')
    } catch ({ message }) {
        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
</head>
<body>
    <h2>Register</h2>
    <form action='/register' method='POST'>
        <input type='text' name='name' placeholder="Name" required>
        <input type='text' name='surname' placeholder="Surname" required>
        <input type='text' name='username' placeholder="username" required>
        <input type='password' name='password' placeholder="Password" required>
        <p style='color: red;'>${message}</p>
        <br>
        <input type='submit' value='Submit'>
        <br>
        <a href='./index.html'>Go to Login</a>
    </form>
</body>
</html>`)
    }
})

logger.debug('setting up server')
app.listen(port, () => { logger.info(`Successfully connected to server on port ${port}`) })
process.on('SIGINT', () => { logger.warn(`server abruptly stopped`); process.exit(0) })