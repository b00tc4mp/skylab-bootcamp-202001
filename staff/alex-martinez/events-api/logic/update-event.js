const { database, database: { ObjectId } } = require('../data')
const { validate } = require('../utils')

module.exports = (id, eventId, newValues) => {

    validate.string(id, 'userId')
    validate.string(eventId, 'eventId')

    const _id = ObjectId(id)
    const _eventId = ObjectId(eventId)

    const events = database.collection('events')

    return events.updateOne( { _id: _eventId, publisher: _id }, { $set: newValues } )
        .then(()=> {})

}