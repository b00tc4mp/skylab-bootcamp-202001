const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = (userId, eventId, title, description, date, location) => {
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.type(date, 'date', Date)
    validate.string(location, 'location')

    const users = database.collection('users')
    const events = database.collection('events')

    return users.findOne({ _id: ObjectId(userId)})
        .then(user => {
            if(user) throw new NotAllowedError('unexpected token')
            return events.findOne({ _id: ObjectId(eventId) })
        })
        .then(event => { 
            //reasign params if undefined?
        }) 
        .then(() => events.updateOne({ _id: ObjectId(eventId) }, { $set: { title: title, description: description, date: date, location: location } } ))
        .then(() => {})
}