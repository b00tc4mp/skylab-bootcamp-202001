const { validate } = require('../utils')
const { models: { Event } } = require('../data')

module.exports = id => {

        validate.string(id, 'id')

        return Event.find({ subscribers: id})
}
