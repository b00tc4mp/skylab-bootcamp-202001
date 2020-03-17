const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    createSpot,
    findAvailableSpots,
    retrievePublishedSpots,
    updateSpot,
    deleteSpot,
    saveSpotPhoto,
    retrieveSpotPhoto,
    bookSpot,
    acceptBooking,
    declineBooking
} = require('./handlers')

const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.patch('/users', [jwtVerifierMidWare, jsonBodyParser], updateUser)

router.post('/users/:id/spots', [jwtVerifierMidWare, jsonBodyParser], createSpot)

router.get('/spots', jwtVerifierMidWare, retrievePublishedSpots)

router.get('/findAvailableSpots', findAvailableSpots)

router.patch('/users/updateSpot/:id', [jwtVerifierMidWare, jsonBodyParser], updateSpot)

router.delete('/users/deleteSpot', [jwtVerifierMidWare, jsonBodyParser], deleteSpot)

router.post('/upload/:spotId', jwtVerifierMidWare, saveSpotPhoto)

router.get('/load/:spotId', retrieveSpotPhoto)

router.post('/users/:id/spots/:id/book', [jwtVerifierMidWare, jsonBodyParser], bookSpot)

router.post('/users/:id/spots/:id/accepted', [jwtVerifierMidWare, jsonBodyParser], acceptBooking)

router.post('/users/:id/spots/:id/declined', [jwtVerifierMidWare, jsonBodyParser], declineBooking)

module.exports = router

