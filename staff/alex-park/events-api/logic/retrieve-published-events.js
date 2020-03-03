const { models: { Event } } = require('../data')
const { validate } = require('../utils')

module.exports = id => {
    validate.string(id, 'id')

    return Event.find({ publisher: id })
}