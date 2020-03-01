require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { database, database: { ObjectId }, models: { User, Event } } = require('../data')
const { expect } = require('chai')
const { random } = Math
const subscribeEvent = require('./subscribe-event')

describe('subscribeEvent', () => {
    before(() =>
        database.connect(TEST_MONGODB_URL)
            .then(() => {
                users = database.collection('users')
                events = database.collection('events')
            })
    )

    let name, surname, email, password, users, events, title, description, date, location

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
        beforeEach(() =>
            users.insertOne(new User({ name, surname, email, password }))
                .then(({ insertedId }) => userId = insertedId.toString())
                .then(userId => events.insertOne(new Event({ publisher: ObjectId(userId), title, description, location, date })))
                .then(({ insertedId }) => eventId = insertedId.toString())
                .then(eventId => users.updateOne({ _id: ObjectId(userId) }, { $push: { publishedEvents: ObjectId(eventId) } }))
        )

        it('should succeed on an effective user subscription to an event', () =>
            subscribeEvent(userId, eventId)
                .then(result => {
                    expect(result).to.be.undefined
                })
                .then(() => users.findOne({ _id: ObjectId(userId) }))
                .then(user => {
                    expect(user.subscribedEvents).not.to.be.undefined
                    expect(user.subscribedEvents).to.be.instanceOf(Array)
                    expect(user.subscribedEvents[0].toString()).to.equal(eventId)
                })
                .then(() => events.findOne({ _id: ObjectId(eventId) }))
                .then(event => {
                    expect(event.subscribers).not.to.be.undefined
                    expect(event.subscribers).to.be.instanceOf(Array)
                    expect(event.subscribers[0].toString()).to.equal(userId)
                })
                .catch(() => { throw new Error('should not reach this point') })
        )

        afterEach(() => users.deleteMany({}))
    })

    after(() => 
        events.deleteMany({})
            .then(() => users.deleteMany({}))
            .then(() => database.disconnect())
    )
})