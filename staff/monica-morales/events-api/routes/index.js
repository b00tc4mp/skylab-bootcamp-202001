module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    createEvent: require('./create-event'),
    retrievePublished: require('./retrieve-published-events'),
    subscribeEvent: require('./subscribe-event'),
    retrieveSubscribe: require('./retrieve-subscribe'),
    deleteEvent: require('./delete-event'),
    retrieveLastEvents: require('./retrieve-last-event'),
    updateEvents: require('./update-events')
}