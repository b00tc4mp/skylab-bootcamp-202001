require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { database, database: {ObjectId}, models: { User } } = require('../data')
const { expect } = require('chai')
const { random } = Math
const createEvent = require('./create-event')

describe('createEvent', () => {

  before(() =>
    database.connect(TEST_MONGODB_URL)
    .then(() => {
      users = database.collection('users')
      events = database.collection('events')
    })
  )

  let publisher, title, description, location, date, users, events

  beforeEach(() => {
    publisher = random().toString()
    title = `title-${random()}`
    description = `description-${random()}`
    location = `location-${random()}`
    date = new Date()
  })


  describe('happy path', () => {
    let name, surname, email, password

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
    )

    it('should succed on new event', () =>
      createEvent(publisher.toString(), title, description, location, date)
      .then(result => {
        expect(result).not.to.exist
        expect(result).to.be.undefined
        return events.findOne({publisher, title, description, location, date})
      })
      .then(event => {
        expect(event).to.exist
        expect(event._id).to.be.instanceOf(ObjectId)
        expect(event.title).to.equal(title)
        expect(event.description).to.equal(description)
        expect(event.location).to.equal(location)
        expect(event.date).to.be.instanceOf(Date)
        expect(event.created).to.be.instanceOf(Date)
      })
    )

    afterEach(() =>
      events.deleteOne({publisher, title, description, location, date})
      .then(() => users.deleteOne({publisher}))
    )

  })

  describe('unhappy path with sync errors', () => {
    
    it('should fail on non-string publisher', () => {
      publisher = undefined

      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `publisher ${publisher} is not a string`})

      publisher = 123
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `publisher ${publisher} is not a string`})

      publisher = true
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `publisher ${publisher} is not a string`})

      publisher = {}
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `publisher ${publisher} is not a string`})

      publisher = []
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `publisher ${publisher} is not a string`})
    })

    it('should fail on non-string title', () => {
      title = undefined

      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `title ${title} is not a string`})

      title = 123
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `title ${title} is not a string`})

      title = true
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `title ${title} is not a string`})

      title = {}
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `title ${title} is not a string`})

      title = []
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `title ${title} is not a string`})
    })


    it('should fail on non-string description', () => {
      description = undefined

      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `description ${description} is not a string`})

      description = 123
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `description ${description} is not a string`})

      description = true
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `description ${description} is not a string`})

      description = {}
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `description ${description} is not a string`})

      description = []
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `description ${description} is not a string`})
    })


    it('should fail on non-string location', () => {
      location = undefined

      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `location ${location} is not a string`})

      location = 123
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `location ${location} is not a string`})

      location = true
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `location ${location} is not a string`})

      location = {}
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `location ${location} is not a string`})

      location = []
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `location ${location} is not a string`})
    })
    

    it('should fail on non-date date', () => {
      date = undefined

      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `date ${date} is not a Date`})

      date = 123
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `date ${date} is not a Date`})

      date = true
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `date ${date} is not a Date`})

      date = {}
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `date ${date} is not a Date`})

      date = []
      expect(() => createEvent(publisher, title, description, location, date))
      .to.throw()
      .to.be.instanceOf(TypeError)
      .to.deep.include({message: `date ${date} is not a Date`})
    })
  })

  after(() => database.disconnect())
})