const { models: { Event } } = require('../data')
const { validate } = require('../utils')

module.exports = id => {
    validate.string(id, 'id')
    validate.type(id, 'id', String)

    return Event.find({ publisher: id })
}