const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    addMedication,
    deleteMedication,
    retrievePrescriptedMedication,
    addPrescription,
    retrievePrescription,
    deletePrescription,
    addProgress
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

router.get('/users/medication', jwtVerifierMidWare, retrievePrescriptedMedication)

router.post('/users/:id/add-prescription', [jwtVerifierMidWare, jsonBodyParser], addPrescription)

router.get('/users/prescription', jwtVerifierMidWare, retrievePrescription)

router.delete('/users/:id/prescription/:drugId', jwtVerifierMidWare, deletePrescription)

router.post('/users/:id/add-progress', [jwtVerifierMidWare, jsonBodyParser], addProgress)

module.exports = router