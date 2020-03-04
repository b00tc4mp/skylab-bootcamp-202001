
const {validate} = require("../utils")
const { User, Event } = require('../models')

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