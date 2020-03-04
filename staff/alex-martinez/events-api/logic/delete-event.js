const { models: { Event, User} } = require('../data')
const { validate } = require('../utils')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return Event.findById(eventId)
        .then((event) => {
            event.delete
        })
}