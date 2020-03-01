require('dotenv').config()

const {env: {TEST_MONGODB_URL}} = process
const {database, models: {User, Event}} = require('../data')
const {expect} = require('chai')
const {random} = Math
const {retrieveSubscribedEvents} = require('../logic')

describe('retrieveSubscribedEvents', () => {

  before(() =>
    database.connect(TEST_MONGODB_URL)
    .then(() => {
      users = database.collection('users')
      events = database.collection('events')
    })
  )

  // let users, name, surname, email, password

  let eventId, title, description, location, date, users, events

  beforeEach(() => {
    publisher = random().toString()
    title = `title-${random()}`
    description = `description-${random()}`
    location = `location-${random()}`
    date = new Date()
  })

  describe('happy path', () => {
    let name, surname, email, password, publisher

    beforeEach(() =>
      Promise.resolve()
      .then(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
      })
      .then(() => users.insertOne( new User({name, surname, email, password})))
      .then(({insertedId}) => publisher = insertedId)
      .then(() => events.insertOne( new Event({publisher, title, description, location, date}) ))
      .then(({insertedId}) => eventId = insertedId)
      .then(() => events.updateOne({_id: eventId}, {$addToSet: {subscribers: publisher}} ))
      .then(() => users.updateOne({_id: publisher}, {$addToSet: {subscribedEvents: eventId}}))
    )

    it('should succed retrieving subscribed events', () =>
      retrieveSubscribedEvents(publisher.toString())
      .then(({events, user}) => {
        expect(user).to.exist
        expect(user).to.equal(name)
        expect(events).to.exist
        expect(events).to.be.an('array')
        expect(events.map(ele => ele._id)).to.deep.include(eventId)
      })
    )

    // unhappy path - if not exist
  })


})