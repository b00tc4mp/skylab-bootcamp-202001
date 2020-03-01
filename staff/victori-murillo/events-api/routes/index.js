module.exports = {
  authenticateUser: require('./authenticate-user'),
  registerUser: require('./register-user'),
  retrieveUser: require('./retrieve-user'),
  updateUser: require('./update-user'),
  deleteUser: require('./delete-user'),

  createEvent: require('./create-event'),
  retrieveLastEvents: require('./retrieve-last-events'),
  retrievePublishedEvents: require('./retrieve-published-events'),
  subscribeEvent: require('./subscribe-event'),
  retrieveSubscribedEvents: require('./retrieve-subscribed-events'),
  updateEvent: require('./update-event'),
  deleteEvent: require('./delete-event')
}