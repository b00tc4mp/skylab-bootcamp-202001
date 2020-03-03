require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const mongoose = require('mongoose')
const { expect } = require('chai')
const { random } = Math
const subscribeEvent = require('./subscribe-event')
const { models: { User, Event } } = require('../data')


describe('subscribeEvent', () => {
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
    describe('when a sub case is possible', () => {
        let userId, eventId
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ _id }) => userId = _id.toString())
                .then(() => Event.create({ publisher: userId, title, description, location, date }))
                .then(({ _id }) => eventId = _id.toString())
                .then(() => User.findByIdAndUpdate(userId, { $addToSet: { publishedEvents: eventId } }))
        )
        it('should succeed on an effective user subscription to an event', () =>{
            return subscribeEvent(userId, eventId)  
                .then(result => { 
                    expect(result).to.be.undefined
                })
                .then(() => User.findById( userId ))
                .then(user => {
                    expect(user.subscribedEvents).not.to.be.undefined
                    expect(user.subscribedEvents).to.be.instanceOf(Array)
                    expect(user.subscribedEvents[0]).to.equal(eventId)
                })
                .then(() => Event.findById(eventId) )
                .then(event => {
                    expect(event.subscribers).not.to.be.undefined
                    expect(event.subscribers).to.be.instanceOf(Array)
                    expect(event.subscribers[0]).to.equal(userId)
                })
                .catch(({message}) => { console.log(message) })
        })
        afterEach(() => User.deleteMany({}))
    })
    after(() => 
        Event.deleteMany({})
            .then(() => User.deleteMany({}))
            .then(() => mongoose.disconnect())
    )
})