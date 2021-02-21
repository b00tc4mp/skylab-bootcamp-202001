const { Router } = require('express')
const router = Router()
const { register, authenticate, retrieve, update, remove } = require("../routes/user")

module.exports = router
  .post('/users', register)
  .post('/users/auth', authenticate)
  .get('/users', retrieve)
  .patch('/users', update)
  .delete('/users', remove)