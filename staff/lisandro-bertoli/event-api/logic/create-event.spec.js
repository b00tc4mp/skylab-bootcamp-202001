require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { database, database: { ObjectId }, models: { User, Event } } = require('../data')
const { expect } = require('chai')
const { random } = Math
const createEvent = require('./create-event')
const { ContentError } = require('../errors')

describe('createEvent', () => {
    before(() =>
        database.connect(TEST_MONGODB_URL)
            .then(() => {
                users = database.collection('users')
                events = database.collection('events')
            })
    )

    let name, surname, email, password, users, events, title, description, date, location, dummyId

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
        let id

        beforeEach(() =>
            users.insertOne(new User({ name, surname, email, password }))
                .then(({ insertedId }) => id = insertedId.toString())
        )

        it('should succeed on correct and valid and right data', () =>
            createEvent(id, title, description, location, date)
                .then(() =>
                    events.findOne({ title, description, location, date, publisher: ObjectId(id) })
                )
                .then(event => {
                    expect(event).to.exist
                    expect(event.title).to.equal(title)
                    expect(event.description).to.equal(description)
                    expect(event.date).to.deep.equal(date)
                    expect(event.location).to.equal(location)
                    expect(event.publisher.toString()).to.equal(id)
                })
        )

        it('should add event-id to the user published events', () =>
            createEvent(id, title, description, location, date)
                .then(() => events.findOne({ title, description, location, date, publisher: ObjectId(id) })
                    .then(event => event._id)
                    .then(eventId =>
                        users.findOne({ _id: ObjectId(id) })
                            .then(user => expect(user.publishedEvents).to.deep.include(eventId))
                    )
                )
        )

        it('should fail on invalid publisher id', () => {
            id = '12asdf87'
            expect(() =>
                createEvent(id, title, description, location, date)).to.throw(ContentError, `invalid id in token`)
        })

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




    after(() => database.disconnect())
})