const { validate } = require('events-utils')
const { models: { Event } } = require('events-data')

module.exports = id => {

        validate.string(id, 'id')
        return Event.find({ subscribers: id})
}
