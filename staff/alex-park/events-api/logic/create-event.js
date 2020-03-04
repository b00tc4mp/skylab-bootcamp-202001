const { validate } = require('../utils')
const { models: { Event, User } } = require('../data')
const { NotFoundError } = require('../errors')

module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)

            const event = new Event({ publisher, title, description, location, date, created: new Date })

            user.publishedEvents.push(event.id)

            return Promise.all([user.save(), event.save()])
        })
        .then(() => { })

    // const event = new Event({ publisher, title, description, location, date, created: new Date })
    // debugger
    // return event.save()
    //     .then(() => Event.findOne({ publisher }))
    //     .then((event) => { 
    //         console.log(event._id)
    //         return User.findByIdAndUpdate(publisher, { $addToSet: { publishedEvents: event._id } })})
    //     .then(() => { })
}