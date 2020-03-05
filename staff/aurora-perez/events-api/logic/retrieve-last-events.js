const { models: { Event } } = require('events-data')

module.exports = () => Event.find({ date: { $gte: new Date } })
    .lean()
    .then(events => {
        // sanitize
        events.forEach(event => {
            event.id = event._id.toString()
            delete event._id
            event.publisher = event.publisher.toString()
        })
        return events
    })
// const { models: { Event } } = require('events-data')
// const { validate } = require('events-utils')

// module.exports = () => {

//     const now = new Date 

//     return Event.find({date: { $gt: now}}).sort( { date: 1 } )
    
// }