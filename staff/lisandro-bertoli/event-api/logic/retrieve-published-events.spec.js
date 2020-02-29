require('dotenv').config()
const { retrievePublishedEvents } = require('.')
const { expect } = require('chai')
const { database, database: { ObjectId }, models: { User, Event } } = require('../data')
const { env: { TEST_MONGODB_URL } } = process
const { random } = Math

describe('retrievePublishedEvents', () => {
    let events, users, userId

    before(() =>
        database.connect(TEST_MONGODB_URL)
            .then(() => {
                events = database.collection('events')

                users = database.collection('users')
            })
    )

    let title, description, date, location

    beforeEach(() => {
        let name, surname, email, password

        name = `name-${random()}`
        surname = `surnamename-${random()}`
        email = `email-${random()}@email.com`
        password = `password-${random()}`



        title = `title-${random()}`
        description = `description-${random()}`
        date = new Date
        location = `location-${random()}`

        return users.insertOne(new User({ name, surname, email, password }))
            .then(({ insertedId }) => userId = insertedId.toString())

    })

    describe('when user has published events', () => {
        let eventId

        beforeEach(() => {
            events.insertOne(new Event({ publisher: ObjectId(userId), title, description, date, location }))
                .then(({ insertedId }) => eventId = insertedId.toString())
        })

        it('should succeed on valid id', () =>
            retrievePublishedEvents(userId)
                .then(events => {
                    expect(events.length).to.be.greaterThan(0)

                    events.forEach(event => {
                        expect(event.title).to.equal(title)
                        expect(event.description).to.equal(description)
                        expect(event.date).to.be.deep.equal(date)
                        expect(event.title).to.equal(title)
                        expect(event._id.toString()).to.equal(eventId)
                        expect(event.publisher.toString()).to.equal(userId)
                    })
                })
        )
    })

    describe('when user has no published events', () => {
        it('should succeed on valid id, returning empty array', () =>
            retrievePublishedEvents(userId)
                .then(events => {
                    expect(events).to.exist
                    expect(events.length).to.equal(0)
                })
        )

    })

    after(() => database.disconnect())

})