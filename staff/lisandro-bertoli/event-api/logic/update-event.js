const { validate } = require('../utils')
const { database, database: { ObjectId }, models: { Event } } = require('../data')
const { NotFoundError, NotAllowedError } = require('../errors')


module.exports = (userId, eventId, updates) => {

    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const validKeys = ['title', 'description', 'date', 'location']

    let approvedUpdates = {}

    for (key in updates) {
        if (!(validKeys.includes(key))) throw new Error(`invalid field ${field}`)
        if (key !== '') {
            approvedUpdates.key = updates[key]
        }
    }






    userId = ObjectId(userId)
    eventId = ObjectId(eventId)

    const events = database.collection('events')

    return events.updateOne({ _id: eventId, published: userId }, { $set: { ...approvedUpdates } })
}