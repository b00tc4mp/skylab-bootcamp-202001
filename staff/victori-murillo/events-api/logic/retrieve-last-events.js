const { Event } = require('../models')

module.exports = () => Event.find({ date: { $gte: new Date } })
  .lean()
  .then(events => {
    events.forEach(event => {
      console.log(event)
      event.id = event._id.toString()
      delete event._id
      delete event.__v
      
      event.publisher = event.publisher.toString()
      console.log(event)
    })
    
    return events
  })