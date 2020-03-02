require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { models: { User, Event } } = require('../data')
const mongoose = require('mongoose')
const { expect } = require('chai')
const { random } = Math
const subscribeEvent = require('./subscribe-event')

describe('subscribeEvent', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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

    describe('when a sub case is possible', () => {
        let userId, eventId
        debugger
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => userId = id)
                .then(() => Event.create({ publisher: userId, title, description, location, date }))
                .then(({_id}) => eventId = _id.toString())
                .then(() => User.findByIdAndUpdate(userId, { $addToSet: { publishedEvents: eventId } }))
                .then(() => {})
        )
        debugger
        it('should succeed on an effective user subscription to an event', () => {
            debugger
            return subscribeEvent(userId, eventId)
                .then(() => User.findById(userId))
                .then(user => { debugger
                    expect(user.subscribedEvents).not.to.be.undefined
                    expect(user.subscribedEvents).to.be.instanceOf(Array)
                    expect(user.subscribedEvents[0].toString()).to.equal(eventId)
                })
                .then(() => Event.findById(eventId))
                .then(event => {
                    expect(event.subscribers).not.to.be.undefined
                    expect(event.subscribers).to.be.instanceOf(Array)
                    expect(event.subscribers[0].toString()).to.equal(userId)
                })
                .catch(() => { throw new Error('should not reach this point') })
        }
        )

        afterEach(() => User.deleteMany({}))
    })

    after(() =>
        Event.deleteMany({})
            .then(() => User.deleteMany({}))
            .then(() => mongoose.disconnect())
    )
})