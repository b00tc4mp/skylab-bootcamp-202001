const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { ContentError, NotAllowedError } = require('../errors')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    let _id

    try {
        id = ObjectId(id)

    } catch ({ message }) {
        throw new ContentError(`invalid id in token: ${message}`)
    }

    const events = database.collection('events')

    return events.deleteOne({ _id, publisher: ObjectId(userId) })
        .then(({ deletedCount }) => deletedCount === 1 ? true : false)
        .then(success => {
            if (!success)
                throw new NotAllowedError(`user with id ${userId} did not create this event`)
        })
}