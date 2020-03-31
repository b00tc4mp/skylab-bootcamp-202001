const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    saveSession,
    startDrone
} = require('./handlers')

const { jwtVerifierMidWare } = require('../mid-wares')

const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.post('/sessions', [jwtVerifierMidWare, jsonBodyParser], saveSession)

router.post('/', jsonBodyParser, startDrone)


module.exports = router