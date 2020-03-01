const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')

module.exports = id => {
    validate.string(id, 'id')

    let _id

    try {
        _id = ObjectId(id)

    } catch ({ message }) {
        throw new ContentError(`invalid id in token: ${message}`)
    }

    const events = database.collection('events')

    return events.find({ publisher: _id }).toArray()
        .then(events => events)

}