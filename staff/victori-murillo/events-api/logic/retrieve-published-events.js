const {database, database: {ObjectId}} = require("../data")
const {validate} = require("../utils")

module.exports = (id) => {
  validate.string(id, 'id')
  
  const events = database.collection('events')
  const users = database.collection('users')

  const _id = ObjectId(id)

  return events.find({publisher: _id}).toArray()
  .then(events => 
    users.findOne({_id})
    .then(user => {
      debugger
      return {events, user: user.name}
    })
  )
}