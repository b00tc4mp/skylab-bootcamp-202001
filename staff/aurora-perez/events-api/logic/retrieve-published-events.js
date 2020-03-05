const { models: { Event } } = require('events-data')
const { validate } = require('events-utils')

module.exports = id => {
    
    validate.string(id, 'id')
    
    return Event.find({ publisher: id })
}