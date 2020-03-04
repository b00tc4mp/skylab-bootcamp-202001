
const { validate } = require('../utils')
const { User, Event } = require('../models')

module.exports = (id) => {
  validate.string(id, 'id')

  return User.findOne({ _id: id })
    .then(user => Event.find({ id: { "$in": user.subscribedEvents } }).toArray()
      .then(events => { return { events, user: user.name } }))
} 