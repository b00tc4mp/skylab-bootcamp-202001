const { Router } = require('express')
const router = Router()
const { jwtValidationMidWare, errorHandler } = require('../mid-wares')

const {
    user,
    park
} = require('./handlers')

const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

router.post('/users', jsonBodyParser, user.register)

router.post('/users/auth', jsonBodyParser, user.authenticate)

router.get('/users/:id', [jwtValidationMidWare], user.retrieve)

router.post('/users/:id/parks', [jwtValidationMidWare, jsonBodyParser], park.create)

router.patch('/users/:id/parks/:id', jwtValidationMidWare, park.approve)

router.use(errorHandler)

module.exports = router
