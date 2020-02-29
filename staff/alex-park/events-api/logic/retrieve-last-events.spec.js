require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { database, database: { ObjectId }, models: { User, Event } } = require('../data')
const { expect } = require('chai')
const { random } = Math
const retrieveLastEvents = require('./retrieve-last-events')

describe('retrieveLastEvents', () => {
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
        date = new Date('December 25, 2099 20:00:00')
        location = `location-${random()}`
    })

    describe('when there are events to display', () => {
        let id
        beforeEach(() =>
            users.insertOne(new User({ name, surname, email, password }))
                .then(({ insertedId }) => id = insertedId.toString())
                .then(() => events.insertOne(new Event({ publisher: ObjectId(id), title, description, location, date })))
                .then(results => users.updateOne({ _id: ObjectId(id) }, { $push: { publishedEvents: results.insertedId } }))
        )

        it('should successfuly retrieve all events later than now', () =>
            retrieveLastEvents()
                .then(events => {
                    expect(events[0]).to.exist
                    expect(events[0].title).to.equal(title)
                    expect(events[0].description).to.equal(description)
                    expect(events[0].date).to.deep.equal(date)
                    expect(events[0].location).to.equal(location)
                    expect(events[0].publisher.toString()).to.equal(id)
                })
        )

        afterEach(() => users.deleteMany({}))

    })

    after(() => {
        events.deleteMany({})
            .then(() => users.deleteMany({}))
            .then(() => database.disconnect())
    })
})