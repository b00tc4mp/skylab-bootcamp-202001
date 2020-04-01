const { models: { Event, User } } = require('events-data')
const { validate } = require('events-utils')

module.exports = ( userId ) => {
    validate.string(userId, 'userId')

    return Event.find({ subscribers: userId })
    
}