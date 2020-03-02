const { validate } = require('../utils')
const { database, database: { ObjectId }, models: { Event } } = require('../data')

module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)
    const events = database.collection('events')
    const users = database.collection('users')
    return events.findOne(({ publisher: ObjectId(publisher)}))
        .then(results => users.updateOne({_id: ObjectId(publisher)}, {$set: {title, description, location, date }}))
