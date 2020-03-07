const { Router } = require('express')
const router = Router()

var bodyParser = require('body-parser')
const { errorHandler } = require('../middleware')
const { user } = require('./handlers')

module.exports = router
  .use(bodyParser.json())
  .post('/users', user.register)
  .use(errorHandler)
