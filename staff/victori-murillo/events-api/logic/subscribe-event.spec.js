const { database, database: { ObjectId }, models: { User, Event } } = require('../models')
const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { random } = Math
const { subscribeEvent } = require('.')

describe('subscribeEvent', () => {

  before(() => mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }))

  let name, surname, email, password, 
  publisher, title, description, location, date, subscribers, eventId

  beforeEach(() => {
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
  })


  describe('when user already exists', () => {

    beforeEach(() => {
      Promise.resolve()
        .then(() => users.insertOne(new User({ name, surname, email, password })))
        .then(({ insertedId }) => publisher = insertedId)
        .then(() => {
          publisher = random().toString()
          title = `title-${random()}`
          description = `description-${random()}`
          location = `location-${random()}`
          date = new Date()
        })
        .then(() => events.insertOne(new Event({ publisher, title, description, location, date })))
        .then(({ insertedId }) => eventId = insertedId)
    })

    it('should succed on new subscribe event', () => {
      return subscribeEvent(publisher, eventId)
        .then(result => {
          expect(result).to.be.undefined
          expect(result).to.not.exist
        })
        .then(() => {
          return users.findOne({ subscribedEvents: { $in: [eventId] } })
            .then(user => {
              expect(user._id).to.equal(publisher)
            })
        })
    })




  })




})