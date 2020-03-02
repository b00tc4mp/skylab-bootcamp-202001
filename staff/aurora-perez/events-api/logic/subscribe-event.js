//subscribeEvent(id: String - user id, eventId: String - event id): Promise // PATCH

const { validate } = require('../utils')
const {database, database: {ObjectId}} = require('../data')

module.exports = (userId, eventId ) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    const users = database.collection('users')
    const events = database.collection('events')

    const _userId = ObjectId(userId)
    const _eventId = ObjectId(eventId)

    return users.findOne({_id: _userId})
    .then(user => {
        if(user.subscribedEvents){
            if ((user.subscribedEvents).includes(eventId)) return users.updateOne({_id: _userId }, { $pull: { subscribedEvents : _eventId}})
            else return users.updateOne( {_id: _userId }, { $push: { subscribedEvents : _eventId}})
        }
        return users.updateOne( {_id: _userId }, { $push: { subscribedEvents : _eventId}})
    })
    .then(()=> events.findOne({_id: _eventId}))
    .then( event => {
        if(event.subscribers){
            if((event.subscribers).includes(userId)) return events.updateOne({_id: _eventId}, { $pull: {subscribers: _userId}})
            else return events.updateOne( {_id: _eventId}, { $push: { subscribers: _userId}})
        }
        return events.updateOne( {_id: _eventId}, { $push: { subscribers: _userId}})
    })
    .then( () => {})
}
