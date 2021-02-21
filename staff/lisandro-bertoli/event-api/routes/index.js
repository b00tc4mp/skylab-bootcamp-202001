const { Router } = require('express')
const router = Router()
const { jwtValidationMidWare, errorHandler } = require('../mid-wares')


const { //registerUser,
    authenticateUser,
    retrieveUser,
    createEvent,
    retrievePublishedEvents,
    retrieveLastEvents,
    subscribeEvent,
    retrieveSubscribedEvents,
    updateEvent,
    deleteEvent,
    deleteUser,
    user } = require('./handlers')


const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

router.post('/users', jsonBodyParser, user.register)


router.get('/users', jwtValidationMidWare, retrieveUser)

router.post('/users/auth', jsonBodyParser, user.authenticate)


router.post('/users/:id?/events', [jwtValidationMidWare, jsonBodyParser], createEvent)

router.get('/users/:id?/events', jwtValidationMidWare, retrievePublishedEvents)

router.get('/users/:id?/subscribed-events', jwtValidationMidWare, retrieveSubscribedEvents)

router.patch('/users/:id?/events', [jwtValidationMidWare, jsonBodyParser], subscribeEvent)

router.patch('/events/:id', [jwtValidationMidWare, jsonBodyParser], updateEvent)

router.delete('/users/events/:id', jwtValidationMidWare, deleteEvent)

router.delete('/users', [jwtValidationMidWare, jsonBodyParser], deleteUser)

router.get('/events/:page?', retrieveLastEvents)

router.use(errorHandler)

module.exports = router