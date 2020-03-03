const { models: { Event, User } } = require('../data')
const { validate } = require('../utils')

module.exports = (userId, eventId ) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')


    return User.findByIdAndUpdate(userId, {$addToSet: {subscribedEvents: eventId}} )
    .then(()=> Event.findByIdAndUpdate(eventId, {$addToSet: {subscribers: userId}} ))
    .then( () => {})
}
