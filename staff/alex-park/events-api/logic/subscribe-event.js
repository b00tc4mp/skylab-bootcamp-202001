const { validate } = require('../utils')
const { models: { User, Event } } = require('../data')
const { NotFoundError } = require('../errors')

module.exports = (id, _id) => {
    
    validate.string(id, 'user ID')
    validate.string(_id, 'event ID')

    return Promise.all([User.findById(id), Event.findById(_id)])
    .then(([user, event]) => {
        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        if (!event) throw new NotFoundError(`event with id ${_id} not found`)

        user.subscribedEvents.push(event.id)
        event.subscribers.push(user.id)

        return Promise.all([user.save(), event.save()])
    })
}