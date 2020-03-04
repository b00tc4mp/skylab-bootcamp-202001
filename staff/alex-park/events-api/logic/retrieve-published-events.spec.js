require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { models: { User, Event } } = require('../data')
const mongoose = require('mongoose')
const { expect } = require('chai')
const { random } = Math
const retrievePublishedEvents = require('./retrieve-published-events')

describe('retrievePublishedEvents', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Event.deleteMany()]))
    )

    let name, surname, email, password, title, description, date, location

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        title = `title-${random()}`
        description = `description-${random()}`
        date = new Date
        location = `location-${random()}`
    })

    describe('when no events have been published', () => {
        let _id
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => _id = id)
        )

        it('should return a message when no events are found on that user', () =>
            retrievePublishedEvents(_id)
                .then(message => {
                    expect(message.length === 0).to.be.true
                    expect(message).to.be.instanceOf(Array)
                })
        )

        afterEach(() => User.deleteMany({}))
    })

    describe('when at least one event has been published', () => {
        let _id, _other
        beforeEach(() =>
            User.insertMany([
                { name, surname, email, password },
                { name, surname, email, password }
            ])
                .then(([{ id }, { id: other }]) => {
                    _id = id
                    _other = other
                })
                .then(() => {
                    const events = []

                    const now = new Date

                    date = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())

                    for (let i = 0; i < 20; i++)
                        events.push({ publisher: i < 10 ? _id : _other, title, description, date, location })

                    return Event.insertMany(events)
                })
        )


        it('should successfuly retrieve all events published by the user', () =>
            retrievePublishedEvents(_id)
                .then(events => {
                    expect(events).to.exist
                    expect(events).to.have.lengthOf(10)

                    events.forEach(event => {
                        expect(event.id).to.be.a('string')
                        expect(event._id).to.be.undefined
                        expect(event.title).to.equal(title)
                        expect(event.description).to.equal(description)
                        expect(event.date).to.deep.equal(date)
                        expect(event.location).to.equal(location)
                        expect(event.publisher).to.be.a('string')
                        expect(event.publisher).to.equal(_id)
                    })
                })
        )

        afterEach(() => User.deleteMany({}))

    })

    after(() =>
        Event.deleteMany({})
            .then(() => User.deleteMany({}))
            .then(() => mongoose.disconnect())
    )
})