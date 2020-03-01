const {database: db, database: {ObjectId}} = require('../data')
const {validate} = require('../utils')

module.exports = (userId, eventId) => {

  validate.string(userId, 'id')
  validate.string(eventId, 'id')

  const users = db.collection('users')
  const events = db.collection('events')

  return events.updateOne({_id: ObjectId(eventId)}, {$addToSet: {subscribers: ObjectId(userId)}} )
  .then(() => {
    return users.updateOne({_id: ObjectId(userId)}, {$addToSet: {subscribedEvents: ObjectId(eventId)}})
    .then(() => {})
  })

}