const { validate } = require('../utils')
const { models: { Event, User } } = require('../data')

module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    const event = new Event({ publisher, title, description, location, date, created: new Date })
    debugger
    return event.save()
        .then(() => Event.findOne({ publisher }))
        .then((event) => { 
            console.log(event._id)
            return User.findByIdAndUpdate(publisher, { $addToSet: { publishedEvents: event._id } })})
        .then(() => { })
}