const { Router } = require('express')
const router = Router()

const body = require('body-parser').json()
const { errorHandler, status } = require('../middleware')
const { user, company } = require('./handlers')

module.exports = router
  .use(body)
  .use(status)

  .post('/companies', company.register)
  .get('/companies/:id', company.retrieve)
  .get('/companies', company.retrieveAll)

  .post('/users', user.register)
  .post('/users/auth', user.authenticate)


  .use(errorHandler)
