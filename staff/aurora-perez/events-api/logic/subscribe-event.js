//subscribeEvent(id: String - user id, eventId: String - event id): Promise // PATCH

const { validate } = require('../utils')
const {database, database: {ObjectId}} = require('../data')

module.exports = (userId, eventId ) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const users = database.collection('users')
    const events = database.collection('events')

    return users.updateOne( {_id: ObjectId(userId) }, { $push: { subscribedEvents : ObjectId(eventId)}})
    .then( () => { events.updateOne( {_id: ObjectId(eventId)}, { $push: { subscribers: ObjectId(userId) }})})
    .then( () => {})
}
