const {database: db, database: {ObjectId}} = require("../data")
const {validate} = require('../utils')

module.exports = (id) => {
  validate.string(id, 'id')

  const users = db.collection('users')
  const events = db.collection('events')

  return users.findOne({_id: ObjectId(id)})
  .then(user => events.find({_id: {"$in": user.subscribedEvents }}).toArray()
  .then(events => {return {events, user: user.name}}))
} 