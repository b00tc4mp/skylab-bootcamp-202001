const { validate } = require('../utils')
const { models: { User, Event } } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return User.findOne({ _id: userId, subscribedEvents: eventId})
        .then(user => {
            if(user) throw new NotAllowedError('User already subscribed to this event')
        })
        .then(() => User.deleteMany({ subscribedEvents: eventId }, { $push: { subscribedEvents: eventId }} ))
        .then(user => user.save())
        .then(() => Event.deleteOne({ _id: eventId }))
        .then(event => event.save())
}



