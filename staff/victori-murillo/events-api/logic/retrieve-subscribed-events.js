
const { validate } = require('events-utils')
const { User, Event } = require('events-models')

module.exports = (id) => {
  validate.string(id, 'id')

  return User.findOne({ _id: id })
    .then(user => Event.find({ id: { "$in": user.subscribedEvents } }).toArray()
      .then(events => { return { events, user: user.name } }))
} 