const { validate } = require('../utils')
const { models: { Event, User } } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return Event.deleteOne({ _id: eventId, publisher: userId })
        .then(({ ok }) => {
            if (ok === 0)
                throw new NotAllowedError(`user with id ${userId} did not create this event`)
        })
        .then(() => User.findById(userId))
        .then(user => {
            const subscriptions = user.subscribedEvents.filter(id => id !== eventId)

            user.subscribedEvents = subscriptions

            return user.save()
        })
        .then(() => { })

}