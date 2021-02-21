const retrievePublishedEvents = require('./retrieve-published-events')
const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const { mongoose, models: { User, Event } } = require('events-data')
const { random } = Math

describe('retrievePublishedEvents', () => {
    let userId

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Promise.resolve([User.deleteMany(), Event.deleteMany()])
    })

    let title, description, date, location

    beforeEach(async () => {
        let name, surname, email, password

        name = `name-${random()}`
        surname = `surnamename-${random()}`
        email = `email-${random()}@email.com`
        password = `password-${random()}`



        title = `title-${random()}`
        description = `description-${random()}`
        date = new Date
        location = `location-${random()}`

        const userId = await User.create(new User({ name, surname, email, password }))
        return userId
    })

    describe('when user has published events', () => {
        let eventId

        beforeEach(async () => {

            const eventId = await Event.create({ publisher: userId, title, description, date, location })
            return eventId
        })

        it('should succeed on valid id', () =>
            retrievePublishedEvents(userId)
                .then(events => {

                    expect(events.length).to.be.greaterThan(0)

                    events.forEach(event => {
                        expect(event.title).to.equal(title)
                        expect(event.description).to.equal(description)
                        expect(event.date).to.be.deep.equal(date)
                        expect(event.title).to.equal(title)
                        expect(event._id.toString()).to.equal(eventId)
                        expect(event.publisher.toString()).to.equal(userId)
                    })
                })
        )
    })

    describe('when user has no published events', () => {
        it('should succeed on valid id, returning empty array', () =>
            retrievePublishedEvents(userId)
                .then(events => {
                    expect(events).to.exist
                    expect(events.length).to.equal(0)
                })
        )

    })

    after(() => mongoose.disconnect())

})