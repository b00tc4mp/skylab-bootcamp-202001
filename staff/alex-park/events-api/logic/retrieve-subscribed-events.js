const { validate } = require('../utils')
const { models: { Event } } = require('../data')

module.exports = userId => {
    validate.string(userId, 'user ID')

    return Event.find({ subscribers: userId })
}