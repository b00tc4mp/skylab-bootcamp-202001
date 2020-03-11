const { Router } = require('express')
const router = Router()
const cors = require('cors')
const bodyParser = require('body-parser').json()
const { errorHandler, status, jwtVerify, validateRole } = require('../middleware')
const { company, user, credit } = require('./handlers')

module.exports = router
  .use(cors())
  .use(bodyParser)
  .use(status)

  .post('/companies', company.register)
  .post('/users/auth', user.authenticate)

  .use(jwtVerify)

  .get('/companies/:id', company.retrieve)
  .get('/companies', validateRole, company.retrieveAll)

  .post('/users', user.register)
  .get('/users/:id', user.retrieve)
  .get('/users-companies', user.retrieveAll)
  .patch('/users/:id?', user.update)
  .delete('/users/:id', user.delete)

  .post('/credits/:id', credit.register)
  // .patch('/credits/:id', credit.register)
  // .delete('/credits/:id', credit.register)

  .use(errorHandler)
