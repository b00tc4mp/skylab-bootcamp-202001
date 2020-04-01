const { models: { Event } } = require('events-data')

module.exports = () => Event.find({ date: { $gte: new Date } })
    .populate( 'publisher', 'name surname')
    .lean()
    .then(events => {
        // sanitize
        events.forEach(event => {
            event.id = event._id.toString()
            delete event._id
            const {publisher: {name, surname}} = event
            event.publisher = `${name} ${surname}`
            //event.publisher = event.publisher.toString()
        })
        return events
    })
