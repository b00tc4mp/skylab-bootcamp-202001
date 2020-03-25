const { Router } = require('express')
const router = Router()
const cors = require('cors')
const bodyParser = require('body-parser').json()
const { errorHandler, status, jwtVerify, validateRole } = require('../middleware')
const { company, user, credit, payment } = require('./handlers')

module.exports = router
  .use(cors())
  .use(bodyParser)
  .use(status)

  .post('/companies', company.register)
  .post('/users/auth', user.authenticate)
  
  .patch('/companies/email/:id', company.confirm)
  
  .patch('/users/confirm-data', user.confirmData)
  .patch('/users/confirm-verification-code', user.confirmCode)
  .patch('/users/update-password', user.updatePassword)

  .use(jwtVerify)

  .get('/companies/:id', company.retrieve)
  .get('/companies', validateRole, company.retrieveAll)

  .post('/users', user.register)
  
  .get('/users/:id?', user.retrieve)
  .get('/users-companies', user.retrieveAll)
  .patch('/users/:id?', user.update)
  .delete('/users/:id', user.delete)
  
  .post('/credits/users/:id', credit.register)
  .get('/credit/:creditId', credit.retrieve)
  .get('/credits/user/:userId', credit.retrieveByUser)
  .get('/credits/company', credit.retrieveByCompany)
  // .patch('/credits/:id', credit.update)
  // .delete('/credits/:id', credit.register)

  .post('/payments/credit/:creditId', payment.register)
  .post('/payments/company', payment.retrieveByCompany)


  

  .use(errorHandler)
