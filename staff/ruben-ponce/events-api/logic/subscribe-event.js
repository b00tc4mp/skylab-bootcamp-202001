const { validate } = require('../utils')
const { models: { User, Event } } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return User.findByIdAndUpdate(userId, { $addToSet: { subscribedEvents: eventId } })
        .then(() => Event.findByIdAndUpdate(eventId, { $addToSet: { subscribers: userId } }))
        .then(() => { })
}