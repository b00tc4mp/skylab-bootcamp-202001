require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const mongoose = require('events-data')
const { expect } = require('chai')
const { random } = Math
const retrievePublishedEvents = require('./retrieve-published-events')
const { models: { User, Event } } = require('events-data')


describe('retrievePublishedEvents', () => {
    before(() =>
         mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
           
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
    
    describe('when no events have been published', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => _id = user.id)
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
        let _id
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(user => _id = user.id)
                .then(() => Event.create({ publisher: _id, title, description, location, date }))
                .then(results => User.findOneAndUpdate({ id: _id }, { publishedEvents: results.insertedId }))
        //  .then(results => User.findOneAndUpdate({ id: _id }, { publishedEvents: results._id}))
        )
        it('should successfuly retrieve all events published by the user', () =>
            retrievePublishedEvents(_id)
                .then(events => {
                    expect(events[0]).to.exist
                    expect(events[0].title).to.equal(title)
                    expect(events[0].description).to.equal(description)
                    expect(events[0].date).to.deep.equal(date)
                    expect(events[0].location).to.equal(location)
                    expect(events[0].publisher.toString()).to.equal(_id)
                })
        )
        afterEach(() => User.deleteMany({}))
    })
    after(() => {
        return Event.deleteMany({})
            .then(() => User.deleteMany({}))
            .then(() => mongoose.disconnect())
    })
})