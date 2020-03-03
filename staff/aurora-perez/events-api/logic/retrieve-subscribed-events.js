const { models: { Event, User } } = require('../data')
const { validate } = require('../utils')

module.exports = ( userId ) => {
    validate.string(userId, 'userId')

    return Event.find({ subscribers: userId })
    
}