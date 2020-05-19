const { validate } = require('events-utils')
const { models: { User, Event } } = require('events-data')
// const { Types: { ObjectId } } = require('mongoose')

module.exports = (userId, eventId) => {

    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return User.findByIdAndUpdate(userId, { $addToSet: { subscribed: eventId } })
        .then(() => Event.findByIdAndUpdate(eventId, { $addToSet: { subscribers: userId } }))
        .then(() => { })

}
