//deleteEvent(id: String - user id, eventId: String - event id): Promise // DELETE

const {validate} = require('../utils')
const {database, database: {ObjectId}} = require('../data')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'userId')

    const users = database.collection('users')
    const events = database.collection('events')

    const _userId = ObjectId(userId)
    const _eventId = ObjectId(eventId)

    return users.find({ subscribedEvents: _eventId }).toArray()
    .then( usersArray => usersArray.forEach(user => users.updateOne({_id: user._id}, ), { $pull: {subscribedEvents: _eventId}}))
    .then(()=> users.updateOne({_id: _userId}, {$pull: { publishedEvents: _eventId }}))
    .then(() => events.deleteOne({_id: _eventId}))
    .then(()=>{})

}