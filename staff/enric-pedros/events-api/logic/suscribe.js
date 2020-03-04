const { Types: {ObjectId} } = require('mongoose')
const { validate } = require('../utils')
const { models: { User, Event } } = require('../data')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const _eventId = ObjectId(eventId)
    const _userId = ObjectId(userId)

    return User.findByIdAndUpdate(userId, {$addToSet: {suscribedEvents: _eventId }})
        .then(() => Event.findByIdAndUpdate(eventId, {$addToSet: {suscribed: _userId }}))
        .then(() =>{})
}