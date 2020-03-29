const { validate } = require('events-utils')
const { models: { Event, User } } = require('events-data')
module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)
    const event = new Event({ publisher, title, description, location, date, created: new Date })
    let eventId
    return event.save()
        .then(event => {
            eventId = event.id
            return User.findById(publisher)
        })
        .then(user => {
            user.publishedEvents.push(eventId)
            user.save()
        })
        .then(() => { })
}