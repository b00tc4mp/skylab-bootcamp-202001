require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const mongoose = require('mongoose')
const { expect } = require('chai')
const { random } = Math
const retrieveLastEvents = require('./retrieve-last-events')
const { models: { User, Event } } = require('../data')

describe('retrieveLastEvents', () => {
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
        date = new Date('December 25, 2099 20:00:00')
        location = `location-${random()}`
    })

    describe('when there are events to display', () => {
        let _id
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => _id = id)
                .then(() => Event.create({ publisher: _id, title, description, location, date }))
                .then(event => User.findByIdAndUpdate( _id, { $push: { publishedEvents: event.id } }))
        )
        it('should successfuly retrieve events later than now', () =>
            retrieveLastEvents()
                .then(events => {
                    expect(events[0]).to.exist
                    expect(events[0].title).to.equal(title)
                    expect(events[0].description).to.equal(description)
                    expect(events[0].date).to.deep.equal(date)
                    expect(events[0].location).to.equal(location)
                    expect(events[0].publisher.toString()).to.equal(_id)
                })
        )
        it('should retrieve the array of events, regardless of its length', () => 
            Event.create({ publisher: _id, title: `${title}-2`, description: `${description}-2`, location: `${location}-2`, date: new Date('December 25, 2099 21:00:00') })
                .then(() => retrieveLastEvents())
                .then(events => {
                    expect(events.length > 0).to.be.true
                    expect(events).to.be.instanceOf(Array)
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