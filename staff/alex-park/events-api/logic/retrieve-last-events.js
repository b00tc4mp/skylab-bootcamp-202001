const { models: { Event } } = require('events-data')

module.exports = () => Event.find({ date: { $gte: new Date } })
    .populate('publisher', 'name')
    .lean()
    .then(events => {
        events.forEach(event => {
            event.id = event._id.toString()

            delete event._id

            event.publisher = event.publisher.name
        })

        return events
    })