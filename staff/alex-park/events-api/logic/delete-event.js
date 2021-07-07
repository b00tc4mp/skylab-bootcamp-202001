// const { validate } = require('../utils')
// const { models: { User, Event } } = require('../data')

// module.exports = (userId, eventId) => {
//     validate.string(userId, 'user ID')
//     validate.string(eventId, 'event ID')

//     return User.find({ subscribedEvents: eventId })
//         .then(usersArray => usersArray.forEach(user => User.findByIdAndUpdate(user.id, { $pull: { subscribedEvents: eventId } })))
//         // .then(calls => Promise.all(calls))
//         .then(() => User.findByIdAndUpdate(userId, { $pull: { publishedEvents: eventId } }))
//         .then(() => Event.findByIdAndRemove(eventId))
//         .then(() => { })
// }