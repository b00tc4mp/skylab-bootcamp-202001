const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const events = database.collection('events')

    const _id = ObjectId(eventId)

    return events.deleteOne({ _id, publisher: ObjectId(userId) })
        .then(({ deletedCount }) => deletedCount === 1 ? true : false)
        .then(success => {
            if (!success)
                throw new Error('wrong credentials')
        })
}