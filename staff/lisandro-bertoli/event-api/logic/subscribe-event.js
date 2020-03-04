const { validate } = require('events-utils')
const { models: { User, Event } } = require('events-data')
const { NotFoundError, NotAllowedError } = require('events-errors')

module.exports = (id, eventId) => {
    validate.string(id, 'userId')
    validate.string(eventId, 'eventId')

    return User.findById(id)
        .then(user => {
            const { subscribedEvents } = user
            if (subscribedEvents.includes(eventId))
                throw new NotAllowedError(`user ${id} is already subscribed`)

            user.subscribedEvents.push(eventId)
            return user.save()
        })
        .then(() => Event.findById(eventId))
        .then(event => {
            if (!event) throw new NotFoundError(`event with id ${eventId} does not exist`)

            event.subscribers.push(id)

            return event.save()
        })
        .then(() => { })

}