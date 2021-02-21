const { models: { Event } } = require('events-data')
const { validate } = require('events-utils')


module.exports = (page = '1') => {
    validate.string(page, 'page')
    let limit = 5

    return Event.find({ date: { $gte: new Date } })
        .populate('publisher', 'name id')
        .sort({ date: -1 })
        .limit(limit)
        .skip((page - 1) * limit)
        .lean()
        .then(events => {
            // sanitize
            events.forEach(event => {
                event.id = event._id.toString()
                debugger
                delete event._id
                delete event.__v

                event.subscribers.forEach(subscriber => {
                    subscriber.toString()
                })

            })
            return events
        })

}