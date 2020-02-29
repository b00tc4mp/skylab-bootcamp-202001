const { database, database: { ObjectId } } = require('../data')
const { validate } = require('../utils')

module.exports = id => {
    validate.string(id, 'id')
    validate.type(id, 'id', String)

    const _id = ObjectId(id), events = database.collection('events')

    return events.find({ publisher: _id }).toArray()
}