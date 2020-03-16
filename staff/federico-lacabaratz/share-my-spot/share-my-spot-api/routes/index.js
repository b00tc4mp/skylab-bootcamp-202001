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
    deleteListing,
    saveListingPhoto,
    retrieveListingPhoto,
    createBooking,
    acceptAndIncludeBooking,
    declineAndRemoveBooking
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

router.delete('/users/deleteListing', [jwtVerifierMidWare, jsonBodyParser], deleteListing)

router.post('/users/:id/listings', [jwtVerifierMidWare, jsonBodyParser], createListing)

router.post('/upload/:listingId', jwtVerifierMidWare, saveListingPhoto)

router.get('/load/:listingId', retrieveListingPhoto)

router.post('/users/:id/listings/:id/bookings', [jwtVerifierMidWare, jsonBodyParser], createBooking)

// router.patch('/users/:id/listings/:id', [jwtVerifierMidWare, jsonBodyParser], acceptAndIncludeBooking)

// router.get('/users/subscribedListings', jwtVerifierMidWare, retrieveSubscribedListings)

router.delete('/users/declineAndRemoveBooking', [jwtVerifierMidWare, jsonBodyParser], declineAndRemoveBooking)

module.exports = router

