const express = require('express')
const user = require('../handlers/user')
const bodyParser = require('../utils/body-parser')

const {Router} = express
const app = Router()

app.post('/authenticate', bodyParser, user.authUser)
app.post('/register', bodyParser, user.registerUser)

app.get(["/", "/register.html"], user.renderRegister)
app.get("/login.html", user.renderLogin)

module.exports = app