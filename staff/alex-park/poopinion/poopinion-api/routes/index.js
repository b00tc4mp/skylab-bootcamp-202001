const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    publishToilet,
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

router.post('/users/:id/toilet/:toiletId/comment', [jwtVerifierMidWare, jsonBodyParser], publishComment)

router.delete('/users/:id/toilet/:toiletId/comment/:commentId/delete', jwtVerifierMidWare, deleteComment)

module.exports = router