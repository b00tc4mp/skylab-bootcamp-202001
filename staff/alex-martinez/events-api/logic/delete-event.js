const { database, database: { ObjectId } } = require('../data')
const { validate } = require('../utils')

module.exports = (userId, eventId) => {
    validate.string(id, 'userId')
    validate.string(eventId, 'eventId')

    const _userId = ObjectId(userId)
    const _eventId = ObjectId(eventId)

    const events = database.collection('events')

    return events.deleteOne({_id: _eventId, publisher: _id })
        .then(({deleteCount}) => {
            if(deleteCount)
        })
}