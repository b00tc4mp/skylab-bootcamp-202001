const { validate } = require('../utils')
const { models: { User, Event } } = require('../data')

module.exports = (userId, eventId) => {
    validate.string(userId, 'user ID')
    validate.string(eventId, 'event ID')

    return User.find({ subscribedEvents: eventId })
        .then(usersArray => usersArray.forEach(user => User.findByIdAndUpdate({ id: user.id }, { $pull: { subscribedEvents: eventId } })))
        // .then(calls => Promise.all(calls))
        .then(() => User.findByIdAndUpdate({ id: userId }, { $pull: { publishedEvents: eventId } }))
        .then(() => Event.deleteOne({ publisher: userId }))
        .then(() => { })
}