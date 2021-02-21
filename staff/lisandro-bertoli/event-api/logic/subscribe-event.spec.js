require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Event } } = require('events-data')
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

    describe('when user already exists', () => {
        let userId

        beforeEach(() =>
            User.create(new User({ name, surname, email, password }))
                .then(({ id }) => userId = id)
        )
        describe('when event exists', () => {
            let eventId
            beforeEach(() =>
                Event.create(new Event({ title, description, location, date, publisher: userId }))
                    .then(({ id }) => eventId = id)
            )

            it('should succeed adding userId into event subscribers array', () =>
                subscribeEvent(userId, eventId)
                    .then(() => Event.findById(eventId))
                    .then(event => {

                        expect(event.subscribers).to.contain(userId)
                    })
            )

            it('should succeed adding eventId into users subscribed array', () =>
                subscribeEvent(userId, eventId)
                    .then(() => User.findById(userId)
                        .then(user => expect(user.subscribedEvents).to.contain(eventId))
                    )

            )
        })
    })
    // TODO more happies and unhappies

    after(() => mongoose.disconnect())
})