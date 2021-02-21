const { validate } = require('events-utils')
const { models: { Event, User } } = require('events-data')
const { NotFoundError } = require('events-errors')


module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)



    return User.findById(publisher)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${publisher} does not exist`)

            const event = new Event({ publisher, title, description, date, location })

            user.publishedEvents.push(event.id)

            return Promise.all([user.save(), event.save()])
        })
        .then(() => { })




    // return Event.insertOne(event)
    //     .then(({ insertedId }) => {
    //         users.updateOne({ _id }, { $push: { publishedEvents: insertedId } })
    //     })
    //     .then(() => { })
}