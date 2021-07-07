const {validate} = require('events-utils')
const {User, Event} = require('events-models')

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