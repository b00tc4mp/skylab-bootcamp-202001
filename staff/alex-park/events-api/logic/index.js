module.exports = {
    authenticateUser: require('./authenticate-user'),
    registerUser: require('./register-user'),
    retrieveUser: require('./retrieve-user'),
    publishEvent: require('./publish-event'),
    retrievePublishedEvents: require('./retrieve-published-events'),
    retrieveLastEvents: require('./retrieve-last-events'),
    subscribeEvent: require('./subscribe-event'),
    retrieveSubscribedEvents: require('./retrieve-subscribed-events'),
    deleteEvent: require('./delete-event')
}