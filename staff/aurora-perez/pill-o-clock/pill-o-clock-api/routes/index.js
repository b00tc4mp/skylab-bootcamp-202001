const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    addMedication,
    deleteMedication,
    retrieveMedication,
    addPrescription,
    retrievePrescription
} = require('./handlers')

const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.post('/users/:id/add-medication', [jwtVerifierMidWare, jsonBodyParser], addMedication)

router.post('/users/:id/delete-medication', [jwtVerifierMidWare, jsonBodyParser], deleteMedication)

router.get('/users/medication', jwtVerifierMidWare, retrieveMedication)

router.post('/users/:id/add-prescription', [jwtVerifierMidWare, jsonBodyParser], addPrescription)

router.get('/users/prescription', jwtVerifierMidWare, retrievePrescription)

module.exports = router