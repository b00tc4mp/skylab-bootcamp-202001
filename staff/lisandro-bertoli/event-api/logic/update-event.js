const { validate } = require('../utils')
const { models: { Event } } = require('../data')


module.exports = (userId, eventId, updates) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')


    return Event.updateOne({ _id: eventId, publisher: userId }, { $set: updates }, { runValidators: true })
        .then(({ nModified }) => {
            if (Object.keys(updates).length !== nModified) throw new Error('at leat one field is invalid, the valid fields were modified')
        })
}