const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    publishToilet,
    deleteToilet,
    searchToilets,
    retrieveToilet,
    toggleFavToilet,
    retrieveFavToilets,
    publishComment,
    deleteComment
} = require('./handlers')
const bodyParser = require('body-parser')
const { jwtVerifierMidWare } = require('../mid-wares')
const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.post('/users/:id/toilet', [jwtVerifierMidWare, jsonBodyParser], publishToilet)

router.delete('/users/:id/toilet/:toiletId/delete', jwtVerifierMidWare, deleteToilet)

router.get('/toilets', searchToilets)

router.get('/toilets/:toiletId', retrieveToilet)

router.patch('/users/:id/toilet/:toiletId/favorite', jwtVerifierMidWare, toggleFavToilet)

router.get('/users/:id/favorites', jwtVerifierMidWare, retrieveFavToilets)

router.post('/users/:id/toilet/:toiletId/comment', [jwtVerifierMidWare, jsonBodyParser], publishComment)

router.delete('/users/:id/toilet/:toiletId/comment/:commentId/delete', jwtVerifierMidWare, deleteComment)

module.exports = router