const {validate} = require('../utils')
const {User, Event} = require('../models')

module.exports = (userId, eventId) => {

  validate.string(userId, 'id')
  validate.string(eventId, 'id')

  return Promise.all([User.findById])

  // return events.updateOne({_id: eventId}, {$addToSet: {subscribers: userId}} )
  // .then(() => {
  //   return users.updateOne({_id: userId}, {$addToSet: {subscribedEvents: eventId}})
  //   .then(() => {})
  // })

}