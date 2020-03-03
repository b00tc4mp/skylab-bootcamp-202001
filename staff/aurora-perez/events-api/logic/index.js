module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    publishedEvent: require('./published-event'),
    updateUser: require('./update-user'),
    retrievePublishedEvents: require('./retrieve-published-events'),
    retrieveLastEvents: require('./retrieve-last-events'),
    subscribeEvent: require('./subscribe-event'),
    retrieveSubscribedEvents: require('./retrieve-subscribed-events'),
    deleteEvent: require('./delete-event')
}