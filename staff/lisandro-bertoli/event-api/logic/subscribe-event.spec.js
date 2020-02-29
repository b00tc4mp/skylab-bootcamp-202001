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

    describe('when user already exists', () => {
        let userId

        beforeEach(() =>
            users.insertOne(new User({ name, surname, email, password }))
                .then(({ insertedId }) => userId = insertedId.toString())
        )
        describe('when event exists', () => {
            let eventId
            beforeEach(() =>
                events.insertOne(new Event({ title, description, location, date, publisher: ObjectId(userId) }))
                    .then(({ insertedId }) => eventId = insertedId.toString())
            )

            it('should succeed adding userId into event subscribers array', () =>
                subscribeEvent(userId, eventId)
                    .then(() => events.findOne({ _id: ObjectId(eventId) }))
                    .then(event => expect(event.subscribers).to.deep.include(ObjectId(userId)))
            )

            it('should succeed adding eventId into users subscribed array', () =>
                subscribeEvent(userId, eventId)
                    .then(() => users.findOne({ _id: ObjectId(userId) }))
                    .then(user => expect(user.subscribedEvents).to.deep.include(ObjectId(eventId)))
            )

        })
    })

    // TODO more happies and unhappies

    after(() => database.disconnect())
})