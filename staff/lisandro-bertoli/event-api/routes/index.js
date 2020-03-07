const { Router } = require('express')
const router = Router()
const { jwtValidationMidWare } = require('../mid-wares')

const { registerUser,
    authenticateUser,
    retrieveUser,
    createEvent,
    retrievePublishedEvents,
    retrieveLastEvents,
    subscribeEvent,
    retrieveSubscribedEvents,
    updateEvent,
    deleteEvent,
    deleteUser } = require('./handlers')


const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

router.post('/users', jsonBodyParser, registerUser)

router.get('/users', jwtValidationMidWare, retrieveUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.post('/users/:id?/events', [jwtValidationMidWare, jsonBodyParser], createEvent)

router.get('/users/:id?/events', jwtValidationMidWare, retrievePublishedEvents)

router.get('/users/:id?/subscribed-events', jwtValidationMidWare, retrieveSubscribedEvents)

router.patch('/users/:id?/events', [jwtValidationMidWare, jsonBodyParser], subscribeEvent)

router.patch('/events/:id', [jwtValidationMidWare, jsonBodyParser], updateEvent)

router.delete('/users/events/:id', jwtValidationMidWare, deleteEvent)

router.delete('/users', [jwtValidationMidWare, jsonBodyParser], deleteUser)

router.get('/events/:page?', retrieveLastEvents)

module.exports = router