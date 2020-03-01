const { database: db, database: {ObjectId} } = require('../data')
const { validate } = require('../utils')

module.exports = (data, eventId) => {
  //check fields
  // const fields = []

  const events = db.collection('events')
  const _id = ObjectId(eventId)

  return events.updateOne({_id}, {$set: data })
  .then(() => {})
}