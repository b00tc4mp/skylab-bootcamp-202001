//updateEvent(id: String - user id, eventId: String - event id, { title?, description?, ... }): Promise // PATCH

const {validate} = require('../utils')
const {database, database: {ObjectId}} = require('../data')

module.exports= (userId, eventId, data) => {
    for(const key in data) {
        if( key === 'data' ) validate.type(data[key], `${key}`, Date)
        else validate.string(data[key], `${key}`)
    }
    validate.type(data, 'data', Object)
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const users = database.collection('users')
    const events = database.collection('events')

    const _userId = ObjectId(userId)
    const _eventId = ObjectId(eventId)

    return events.updateOne({_id: _eventId, publisher: _userId}, {$set: data})
    .then( () => {} )
}