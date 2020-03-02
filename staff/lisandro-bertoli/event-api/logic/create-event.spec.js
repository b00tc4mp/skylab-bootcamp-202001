require('dotenv').config()

const mongoose = require('mongoose')
const { env: { TEST_MONGODB_URL } } = process
const { models: { User, Event } } = require('../data')
const { expect } = require('chai')
const { random } = Math
const createEvent = require('./create-event')


describe('createEvent', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    )

    let name, surname, email, password, title, description, date, location, dummyId

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        dummyId = '123123123'
        title = `title-${random()}`
        description = `description-${random()}`
        date = new Date
        location = `location-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create(({ name, surname, email, password }))
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid and right data', () =>
            createEvent(_id, title, description, location, date)
                .then(() =>
                    Event.findOne({ title, description, location, date, publisher: _id })
                )
                .then(event => {
                    expect(event).to.exist
                    expect(event.title).to.equal(title)
                    expect(event.description).to.equal(description)
                    expect(event.date).to.deep.equal(date)
                    expect(event.location).to.equal(location)
                    expect(event.publisher.toString()).to.equal(_id)
                })
        )

        it('should add event-id to the user published events', () =>
            createEvent(_id, title, description, location, date)
                .then(() =>
                    Event.findOne({ title, description, location, date, publisher: _id })
                        .then(event => event._id)
                        .then(eventId =>
                            User.findOne({ publishedEvents: eventId })
                                .then((user) => expect(user.publishedEvents).to.contain(eventId.toString()))

                        )
                )
        )
    })


    it('should fail on non-string or empty publisher id', () => {
        let id = 1
        expect(() => createEvent(id, title, description, location, date)).to.throw(TypeError, `publisher ${id} is not a string`)

        id = true
        expect(() => createEvent(id, title, description, location, date)).to.throw(TypeError, `publisher ${id} is not a string`)

        id = {}
        expect(() => createEvent(id, title, description, location, date)).to.throw(TypeError, `publisher ${id} is not a string`)

        id = ''
        expect(() => createEvent(id, title, description, location, date)).to.throw(Error, `publisher is empty`)
    })

    it('should fail on non-string or empty title', () => {
        let title = 1
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `title ${title} is not a string`)

        title = true
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `title ${title} is not a string`)

        title = {}
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `title ${title} is not a string`)

        title = ''
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(Error, `title is empty`)
    })

    it('should fail on non-string or empty description', () => {
        let description = 1
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `description ${description} is not a string`)

        description = true
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `description ${description} is not a string`)

        description = {}
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `description ${description} is not a string`)

        description = ''
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(Error, `description is empty`)
    })

    it('should fail on non-string or empty location', () => {
        let location = 1
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `location ${location} is not a string`)

        location = true
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `location ${location} is not a string`)

        location = {}
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `location ${location} is not a string`)

        location = ''
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(Error, `location is empty`)
    })

    it('should fail on non-date type or empty date', () => {
        let date = 1
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `date ${date} is not a Date`)

        date = true
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `date ${date} is not a Date`)

        date = {}
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(TypeError, `date ${date} is not a Date`)

        date = ''
        expect(() => createEvent(dummyId, title, description, location, date)).to.throw(Error, `date ${date} is not a Date`)
    })




    after(() => mongoose.disconnect())
})