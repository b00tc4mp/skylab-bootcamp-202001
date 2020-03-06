const { models: { Event } } = require('events-data')

module.exports = () => {
    
    return Event.find(/*{ date: { $gte: new Date } }*/).sort({ date: 1 })
        .lean()
        .then(events => {
            events.forEach(event => {
                event.id = event._id.toString()

                delete event._id

                event.publisher = event.publisher.toString()
            })
            return events
        })
}