const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    createGame,
    retrieveGames,
    joinGame
} = require('./handlers')
const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.post('/games', jsonBodyParser, createGame)

router.get('/game', jwtVerifierMidWare, retrieveGames)

router.patch('/users/:id/games/:gameId', jwtVerifierMidWare, joinGame)

module.exports = router