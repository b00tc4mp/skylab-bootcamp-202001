const { validate } = require('events-utils')
const { Event } = require('events-models')

module.exports = (userId, eventId) => {
  validate.string(userId, 'id')
  validate.string(eventId, 'id')

  return Event.deleteOne({ _id: eventId, publisher: 's' })
    .then(({ deletedCount }) => {

      if (!deletedCount) throw new Error('The Event wasn\'t deleted')
    })

}