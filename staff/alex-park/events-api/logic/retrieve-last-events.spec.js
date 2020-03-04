require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { models: { User, Event } } = require('../data')
const mongoose = require('mongoose')
const { expect } = require('chai')
const { random } = Math
const retrieveLastEvents = require('./retrieve-last-events')

describe('retrieveLastEvents', () => {
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
        date = new Date('December 25, 2099 20:00:00')
        location = `location-${random()}`
    })

    describe('when there are events to display', () => {
        let _id
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => _id = id)
                .then(() => {
                    const events = []

                    const now = new Date

                    date = new Date(now.getFullYear() +1, now.getMonth(), now.getDate())

                    for (let i = 0; i < 10; i++)
                        events.push({ publisher: _id, title, description, location, date })

                    const old = new Date(now.getFullYear() -1, now.getMonth(), now.getDate())

                    for (let i = 0; i < 10; i++)
                    events.push({ publisher: _id, title, description, location, date: old })

                    return Event.insertMany(events)
                })
        )

        it('should successfuly retrieve events later than now', () =>
            retrieveLastEvents()
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