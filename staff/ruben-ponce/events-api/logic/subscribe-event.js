const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const users = database.collection('users')
    const events = database.collection('events')

    return users.findOne({ _id: ObjectId(userId), subscribedEvents: ObjectId(eventId)})
        .then(user => {
            if(user) throw new NotAllowedError('User already subscribed to this event')
        })
        .then(() => users.updateOne({ _id: ObjectId(userId) }, { $push: { subscribedEvents: ObjectId(eventId) } } ))
        .then(() => events.updateOne({ _id: ObjectId(eventId) }, { $push: { subscribers: ObjectId(userId) } } ))
        .then(() => {})
}