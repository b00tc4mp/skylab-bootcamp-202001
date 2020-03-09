const { Router } = require('express')
//require handlers
const { registerUser, authenticateUser, retrieveUser, entryVehicle } = require('./handlers')
//

const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()


const router = new Router()

//routes
router.post('/users', jsonBodyParser, registerUser)
router.post('/users/auth', jsonBodyParser, authenticateUser)
router.get('/users', jwtVerifierMidWare, retrieveUser)

router.post('/ticket', jsonBodyParser, entryVehicle)
//


//export router
module.exports = router