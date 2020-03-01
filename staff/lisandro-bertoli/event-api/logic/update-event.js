const { validate } = require('../utils')
const { database, database: { ObjectId }, models: { Event } } = require('../data')
const { ContentError, NotAllowedError } = require('../errors')


module.exports = (userId, eventId, updates) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const validKeys = ['title', 'description', 'date', 'location']

    let approvedUpdates = {}

    for (key in updates) {
        if (!(validKeys.includes(key))) throw new NotAllowedError(`invalid field ${key}`)

        if (updates[key] !== '') {
            approvedUpdates[key] = updates[key]
        } else {
            throw new ContentError(`field ${key} is empty`)
        }
    }

    userId = ObjectId(userId)
    eventId = ObjectId(eventId)

    const events = database.collection('events')

    return events.updateOne({ _id: eventId, publisher: userId }, { $set: approvedUpdates })
}