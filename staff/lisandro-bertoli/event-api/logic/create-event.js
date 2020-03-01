const { validate } = require('../utils')
const { database, database: { ObjectId }, models: { Event } } = require('../data')
const { ContentError } = require('../errors')

module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    let _id

    try {
        _id = ObjectId(publisher)

    } catch ({ message }) {
        throw new ContentError(`invalid id in token`)
    }



    const events = database.collection('events')
    const users = database.collection('users')

    return events.insertOne(new Event({ publisher: _id, title, description, location, date }))
        .then(({ insertedId }) => {
            users.updateOne({ _id }, { $push: { publishedEvents: insertedId } })
        })
        .then(() => { })
}