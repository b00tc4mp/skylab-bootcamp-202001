const {validate} = require('../utils')
const { models: { Event, User } } = require('../data')

module.exports = (userId, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'userId')

    debugger

    return User.find({ subscribedEvents: eventId })
    .then( usersArray => usersArray.forEach(user => User.findByIdAndUpdate( user._id, { $pull: {subscribedEvents: eventId}})))
    .then(() => User.findByIdAndUpdate( userId, {$pull: { publishedEvents: eventId }}))
    .then(() => Event.deleteOne({_id: eventId}))
    .then(() => {})

}