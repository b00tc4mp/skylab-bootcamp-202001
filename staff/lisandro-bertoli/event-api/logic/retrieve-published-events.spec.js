require('dotenv').config()
const retrievePublishedEvents = require('./retrieve-published-events')
const mongoose = require('mongoose')
const { expect } = require('chai')
const { models: { User, Event } } = require('../data')
const { env: { TEST_MONGODB_URL } } = process
const { random } = Math

describe('retrievePublishedEvents', () => {
    let userId

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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

        return User.create(new User({ name, surname, email, password }))
            .then(({ id }) => {
                debugger
                userId = id
            })

    })

    describe('when user has published events', () => {
        let eventId

        beforeEach(() =>
            Event.create({ publisher: userId, title, description, date, location })
                .then(({ id }) => eventId = id)
        )

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

    after(() => mongoose.disconnect())

})