const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')

module.exports = (userId, eventId) => {
    validate.string(userId, 'user ID')
    validate.string(eventId, 'event ID')

    const users = database.collection('users'), events = database.collection('events')
    const _userId = ObjectId(userId), _eventId = ObjectId(eventId)

    return users.updateOne({ _id: _userId }, { $push: { subscribedEvents: _eventId } })
        .then(() => events.updateOne({ _id: _eventId }, { $push: { subscribers: _userId } }))
        .then(() => { })
}