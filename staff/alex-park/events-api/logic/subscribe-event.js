// const { validate } = require('../utils')
// const { database, database: { ObjectId } } = require('../data')

// module.exports = (userId, eventId) => {
//     validate.string(userId, 'user ID')
//     validate.string(eventId, 'event ID')

//     const users = database.collection('users'), events = database.collection('events')
//     const _userId = ObjectId(userId), _eventId = ObjectId(eventId)
    
//     return users.findOne({ _id: _userId })
//         .then(user => {
//             if (typeof user.subscribedEvents !== 'undefined') {
//                 if (user.subscribedEvents.includes(eventId)) return users.updateOne({ _id: _userId }, { $pull: { subscribedEvents: _eventId } })
//                 else return users.updateOne({ _id: _userId }, { $push: { subscribedEvents: _eventId } })
//             }
//             return users.updateOne({ _id: _userId }, { $push: { subscribedEvents: _eventId } })
//         })
//         .then(() => events.findOne({ _id: _eventId }))
//         .then(event => {
//             if (typeof event.subscribers !== 'undefined') {
//                 if (event.subscribers.includes(userId)) return events.updateOne({ _id: _eventId }, { $pull: { subscribers: _userId } })
//                 else return events.updateOne({ _id: _eventId }, { $push: { subscribers: _userId } })
//             }
//             return events.updateOne({ _id: _eventId }, { $push: { subscribers: _userId } })
//         })
//         .then(() => { })
// }