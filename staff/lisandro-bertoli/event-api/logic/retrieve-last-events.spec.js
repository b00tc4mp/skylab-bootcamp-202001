require('dotenv').config()
const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveLastEvents = require('./retrieve-last-events')
const { mongoose, models: { User, Event } } = require('events-data')

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
        date = new Date
        location = `location-${random()}`
    })
    describe('when user already exists', () => {
        let _id
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => _id = id)
                .then(() => {
                    const events = []
                    const now = new Date()
                    date = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
                    for (let i = 0; i < 10; i++)
                        events.push({ publisher: _id, title, description, date, location })
                    const old = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
                    for (let i = 0; i < 10; i++)
                        events.push({ publisher: _id, title, description, date: old, location })
                    return Event.insertMany(events)
                })
        )
        it('should succeed on correct and valid and right data', () =>
            retrieveLastEvents()
                .then(events => {
                    expect(events).to.exist
                    events.forEach(event => {
                        expect(event.id).to.be.a('string')
                        expect(event._id).to.be.undefined
                        expect(event.title).to.equal(title)
                        expect(event.description).to.equal(description)
                        expect(event.date).to.deep.equal(date)
                        expect(event.location).to.equal(location)
                        expect(event.publisher).to.be.an('object')

                        return User.findById(event.publisher)
                            .then(user => {
                                expect(user).to.exist
                                debugger
                                expect(user.id).to.equal(_id)
                                expect(event.publisher.name).to.equal(user.name)


                            })
                    })
                })
        )
    })
    // TODO more happies and unhappies
    after(() => Promise.all([User.deleteMany(), Event.deleteMany()]).then(() => mongoose.disconnect()))
})