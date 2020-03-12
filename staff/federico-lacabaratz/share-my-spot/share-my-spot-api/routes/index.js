const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    createListing,
    retrieveLastListings,
    retrievePublishedListings,
    updateListing,
    subscribeListing
} = require('./handlers')

const { jwtVerifierMidWare } = require('../mid-wares')

const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.patch('/users', [jwtVerifierMidWare, jsonBodyParser], updateUser)

router.post('/users/:id/listings', [jwtVerifierMidWare, jsonBodyParser], createListing)

router.get('/listings', jwtVerifierMidWare, retrievePublishedListings)

router.get('/lastlistings', retrieveLastListings)

router.patch('/users/updateListing/:id', [jwtVerifierMidWare, jsonBodyParser], updateListing)

// router.patch('/users/subscribeListing', [jwtVerifierMidWare, jsonBodyParser], subscribeListing)

// router.get('/users/subscribedListings', jwtVerifierMidWare, retrieveSubscribedListings)

// router.delete('/users/deleteListing', [jwtVerifierMidWare, jsonBodyParser], unsubscribeListing)

module.exports = router

