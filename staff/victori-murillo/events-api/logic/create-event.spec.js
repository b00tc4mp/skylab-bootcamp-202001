require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const createEvent = require('./create-event')
const { Event, User } = require("../models")
const mongoose = require('mongoose')

describe('createEvent', () => {

  before(() => mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }))

  let name, surname, email, password, 
  title, description, location, date,
  publisher

  beforeEach(() => {
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`

    title = `title-${random()}`
    description = `description-${random()}`
    location = `location-${random()}`
    date = new Date(),

    publisher = `id-${random()}`
  })

  describe('happy path', () => {
    let _id

    beforeEach(() =>
      User.create({ name, surname, email, password })
        .then(user => _id = user.id)
    )

    it('should succed on new event', () =>
      createEvent(_id, title, description, location, date)
        .then(result => {
          expect(result).not.to.exist
          expect(result).to.be.undefined
          return Event.findOne({ publisher: _id, title, description, location, date })
        })
        .then(event => {
          expect(event).to.exist
          expect(event.title).to.equal(title)
          expect(event.description).to.equal(description)
          expect(event.location).to.equal(location)
          expect(event.date).to.deep.equal(date)
          expect(event.publisher.toString()).to.equal(_id)
        })
    )

    afterEach(() =>
      Event.deleteOne({ publisher: _id, title, description, location, date })
        .then(() => User.deleteOne({ _id }))
    )

  })

  describe('unhappy path with sync errors', () => {

    it('should fail on non-string publisher', () => {
      publisher = undefined

      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `publisher ${publisher} is not a string` })

      publisher = 123
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `publisher ${publisher} is not a string` })

      publisher = true
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `publisher ${publisher} is not a string` })

      publisher = {}
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `publisher ${publisher} is not a string` })

      publisher = []
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `publisher ${publisher} is not a string` })
    })

    it('should fail on non-string title', () => {
      title = undefined

      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `title ${title} is not a string` })

      title = 123
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `title ${title} is not a string` })

      title = true
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `title ${title} is not a string` })

      title = {}
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `title ${title} is not a string` })

      title = []
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `title ${title} is not a string` })
    })


    it('should fail on non-string description', () => {
      description = undefined

      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `description ${description} is not a string` })

      description = 123
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `description ${description} is not a string` })

      description = true
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `description ${description} is not a string` })

      description = {}
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `description ${description} is not a string` })

      description = []
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `description ${description} is not a string` })
    })


    it('should fail on non-string location', () => {
      location = undefined

      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `location ${location} is not a string` })

      location = 123
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `location ${location} is not a string` })

      location = true
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `location ${location} is not a string` })

      location = {}
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `location ${location} is not a string` })

      location = []
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `location ${location} is not a string` })
    })


    it('should fail on non-date date', () => {
      date = undefined

      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `date ${date} is not a Date` })

      date = 123
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `date ${date} is not a Date` })

      date = true
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `date ${date} is not a Date` })

      date = {}
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `date ${date} is not a Date` })

      date = []
      expect(() => createEvent(publisher, title, description, location, date))
        .to.throw()
        .to.be.instanceOf(TypeError)
        .to.deep.include({ message: `date ${date} is not a Date` })
    })
  })

  after(() => mongoose.disconnect())
})