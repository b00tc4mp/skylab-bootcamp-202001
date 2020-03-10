const { validate } = require('share-my-spot-utils')
const { models: { Event } } = require('share-my-spot-data')

module.exports = (userId, body, eventId) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')

    return Event.findOneAndUpdate({ _id: eventId, publisher: userId }, { $set: body })
        .then(() => { })
}