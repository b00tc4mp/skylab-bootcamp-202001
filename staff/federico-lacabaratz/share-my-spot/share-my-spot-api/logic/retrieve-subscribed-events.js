const { validate } = require('share-my-spot-utils')
const { models: { Event } } = require('share-my-spot-data')

module.exports = (userId) => {
    validate.string(userId, 'userId')

    return Event.find({ usersSubscribed: userId})
        .then(event => {
            return event
        })
}