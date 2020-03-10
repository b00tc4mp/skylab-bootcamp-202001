const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    createGroup,
    retrieveGroup
} = require('./handlers')
const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.post('/groups', jsonBodyParser, createGroup)

router.get('/group', jwtVerifierMidWare, retrieveGroup)


module.exports = router