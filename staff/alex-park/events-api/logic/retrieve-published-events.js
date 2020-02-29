const { database, database: { ObjectId } } = require('../data')
const { validate } = require('../utils')
const { NotFoundError } = require('../errors')

module.exports = id => {
    validate.string(id, 'id')
    validate.type(id, 'id', String)

    const _id = ObjectId(id)
    const events = database.collection('events')

    return events.find({ publisher: _id }).toArray()
    .then(publishedEvents => {
        if (!publishedEvents.length) throw new NotFoundError('No events published yet')
        else return publishedEvents
    })
}