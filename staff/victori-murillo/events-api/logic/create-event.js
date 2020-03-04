const { validate } = require("../utils")
const { Event } = require('../models')

module.exports = (publisher, title, description, location, date) => {
  validate.string(publisher, 'publisher')
  validate.string(title, 'title')
  validate.string(description, 'description')
  validate.string(location, 'location')
  validate.type(date, 'date', Date)

  const event = new Event({ publisher, title, description, location, date })

  return event.save()
    .then(() => { })
}