const { Router } = require('express')
//require handlers
const { registerUser, 
    authenticateUser, 
    retrieveUser, 
    entryVehicle, 
    addLotsAmount,
    createParking,
    retrieveParking,
    retrieveTicket,
    validateTicket,
    exitVehicle } = require('./handlers')
//

const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()


const router = new Router()

//routes
router.post('/users', jsonBodyParser, registerUser)
router.post('/users/auth', jsonBodyParser, authenticateUser)
router.get('/users', jwtVerifierMidWare, retrieveUser)

router.post('/:name/ticket', jsonBodyParser, entryVehicle)

router.post('/parking/create', jwtVerifierMidWare, jsonBodyParser, createParking)
router.get('/parking/:name', jwtVerifierMidWare, retrieveParking)
router.get('/ticket/:carplate/:parkingname', retrieveTicket)

router.patch('/ticket/:id/validated', validateTicket)
router.get('/ticket/:carplate/:parkingname/exit', exitVehicle)

//router.patch('/parking/:id/update', jsonBodyParser, jwtVerifierMidWare, addLotsAmount)
router.patch('/parking/:name/update', jsonBodyParser, jwtVerifierMidWare, addLotsAmount)
//


//export router
module.exports = router