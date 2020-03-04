const { Types: {ObjectId} } = require('mongoose')
const { validate } = require('../utils')
const { models: { Event, User } } = require('../data')

module.exports = (userId, eventId) => {
    
    validate.string(eventId, 'eventId')
    validate.string(userId, 'userId')

    return User.find({ subscribedEvents: eventId })
    .then( usersArray => {
        console.log(usersArray)
        usersArray.forEach(user => User.findByIdAndUpdate( user._id, { $pull: {suscribedEvents: eventId}}))})
    .then(() => User.findByIdAndUpdate( userId, {$pull: { createdEvents: eventId }}))
    .then(() => Event.deleteOne({_id: eventId}))
    .then(() => {})


}