const path = require("path")
const fs = require("fs")

const authenticate = require('../logic/authenticate')
const register = require('../logic/register')

const authUser = (req, res) => {
  try {
    const {username, password} = req.body
    const user = authenticate(username, password)

    fs.readFile(path.join(__dirname, '../public/welcome.html'), (error, data) => {
      let html = data.toString().replace('{name}', user.name).replace('{surname}', user.surname)
      res.status(200).send(html)
    })
      
  } catch (error) {
    res.status(401).send("<h1>401, Wrong Credentials!</h1>")
  }
}

const registerUser = (req, res) => {
  try {
    register(req.body)
    res.redirect('/login')
    
  } catch (error) {
    res.status(401).send(`<h1>${error.message}</h1>`)
  }
}

const renderRegister = (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, '../public/register.html'))
  } catch (error) {
    console.log(error)
  }
}

const renderLogin = (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, '../public/login.html'))
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  authUser,
  registerUser,
  renderRegister,
  renderLogin
}