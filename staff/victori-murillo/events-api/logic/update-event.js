const { Event } = require('events-models')

module.exports = (data, eventId) => {


  return Event.updateOne({ _id: eventId }, { $set: data })
    .then(() => { })
}