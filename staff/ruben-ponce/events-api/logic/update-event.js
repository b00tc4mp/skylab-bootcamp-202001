const { validate } = require('../utils')
const { database, database: { ObjectId } } = require('../data')
const { NotAllowedError } = require('../errors')

module.exports = (userId, eventId, title, description, date, location) => {
    debugger
    validate.string(userId, 'userId')
    validate.string(eventId, 'eventId')
    if(title) validate.string(title, 'title')
    if(description)validate.string(description, 'description')
    if(date)validate.type(date, 'date', Date)
    if(location)validate.string(location, 'location')

    const users = database.collection('users')
    const events = database.collection('events')
    debugger
    
    // return users.findOne({ _id: ObjectId(userId)})
    // .then(user => {
    //     if(user) throw new NotAllowedError('unexpected token')
        return events.findOne({ _id: ObjectId(eventId) })
    // })
        .then(event => { 
            let _title, _description, _date, _location

                title ? _title = title : _title = event.title
                description ? _description = description : _description = event.description
                date ? _date = date : _date = event.date
                location ? _location = location : _location = event.location

            }) 
            .then(() => events.updateOne({ _id: ObjectId(eventId) }, { $set: { title: title, description: description, date: date, location: location } } ))
            .then(() => {})
}