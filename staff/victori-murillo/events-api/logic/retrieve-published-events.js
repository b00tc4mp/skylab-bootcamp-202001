
const {validate} = require("events-utils")
const { User, Event } = require('events-models')

module.exports = (id) => {
  validate.string(id, 'id')

  return Event.find({publisher: id}).toArray()
  .then(events => 
    User.findOne({id})
    .then(user => {
      return {events, user: user.name}
    })
  )
}