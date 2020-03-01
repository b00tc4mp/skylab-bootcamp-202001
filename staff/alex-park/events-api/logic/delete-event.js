const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')

module.exports = (userId, eventId) => {
    validate.string(userId, 'user ID')
    validate.string(eventId, 'event ID')

    const users = database.collection('users'), events = database.collection('events')
    const _userId = ObjectId(userId), _eventId = ObjectId(eventId)

    return users.find({ subscribedEvents: _eventId }).toArray()
        .then(usersArray => usersArray.forEach(user => users.updateOne({ _id: user["_id"] }, { $pull: { subscribedEvents: _eventId } })))
        // .then(calls => Promise.all(calls))
        .then(() => users.updateOne({ _id: _userId }, { $pull: { publishedEvents: _eventId } }))
        .then(() => events.deleteOne({ _id: _eventId }))
        .then(() => { })
}