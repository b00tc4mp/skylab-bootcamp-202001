const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const TEST_JWT_SECRET = process.env.REACT_APP_JWT_SECRET
const { mongoose, models: { User, Event } } = require('events-data')
const { random } = Math
import subscribeEvent from './subscribe-event'
import context from './context'
const jwt = require('jsonwebtoken')

fdescribe('subscribeEvent', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Promise.all([User.deleteMany(), Event.deleteMany()])
    }
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

        beforeEach(async () => {

            const user = await User.create(new User({ name, surname, email, password }))
            userId = user.id
            context.token = await jwt.sign({ sub: user.id }, TEST_JWT_SECRET)

        })
        describe('when event exists', () => {
            let eventId
            beforeEach(async () => {
                const event = await Event.create(new Event({ title, description, location, date, publisher: userId }))

                eventId = event.id

            })

            it('should succeed adding userId into event subscribers array', async () => {

                await subscribeEvent(eventId)
                const event = await Event.findById(eventId).lean()
                debugger
                expect(event.subscribers.toString()).toBe(userId)

            })
            it('should succeed adding eventId into users subscribed array', async () => {

                await subscribeEvent(eventId)
                const user = await User.findById(userId).lean()


                expect(user.subscribedEvents.toString()).toBe(eventId)
            })
        })
        // TODO more happies and unhappies

        afterAll(async () => {
            await Promise.all([User.deleteMany(), Event.deleteMany()])
            return await mongoose.disconnect()
        })
    })
})