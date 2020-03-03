const { validate } = require('../utils')
const { models: { Event, User } } = require('../data')


module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    const event = new Event({ publisher, title, description, date, location })

    return event.save()
        .then(({ _id }) => {
            return User.findById(publisher)
                .then(user => {
                    debugger
                    user.publishedEvents.push(_id)
                    return user.save()
                })
        })
        .then(() => { })


    // return Event.insertOne(event)
    //     .then(({ insertedId }) => {
    //         users.updateOne({ _id }, { $push: { publishedEvents: insertedId } })
    //     })
    //     .then(() => { })
}