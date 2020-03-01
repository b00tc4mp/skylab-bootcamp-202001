const { database, database: { ObjectId } } = require('../data')
const { validate } = require('../utils')
const { NotFoundError, NotAllowedError } = require('../errors')

module.exports = (id, eventId) => {

    validate.string(id, 'userId')
    validate.string(eventId, 'eventId')

    const _id = ObjectId(id)
    const _eventId = ObjectId(eventId)
 
    const users = database.collection('users')
    const events = database.collection('events')

    return events.findOne({ _id: _eventId, subscribers: _id })
        .then(event => {
            if (event) throw new NotAllowedError(`user ${_id} is already subscribed`)
        })
        .then(() =>
            events.updateOne({ _id: _eventId }, { $push: { subscribers: _id } })
                .then(writeResult => {
                    if (writeResult.modifiedCount === 0) throw new NotFoundError(`event with id ${_id} does not exist`)

                    return users.updateOne({ _id }, { $push: { subscribedEvents: _eventId } })
                })

        )
        .then(() => { })
}