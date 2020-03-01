const {validate} = require("../utils")
const { database:db, database: { ObjectId }, models: { Event } } = require('../data')

module.exports = (publisher, title, description, location, date) => {
  validate.string(publisher, 'publisher')
  validate.string(title, 'title')
  validate.string(description, 'description')
  validate.string(location, 'location')
  validate.type(date, 'date', Date)

  const events = db.collection('events')
  const users = db.collection('users')

  publisher = ObjectId(publisher)

  return events.insertOne( new Event({publisher, title, description, location, date}) )
    .then((result) => {
      return users.updateOne({_id: publisher}, {$push: {publishedEvents: result.insertedId}} )
    })
    .then(() => {})
}