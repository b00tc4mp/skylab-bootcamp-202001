const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const API_URL = process.env.REACT_APP_API_URL
const { mongoose, models: { User, Event } } = require('events-data')
const { random } = Math
const subscribeEvent = require('./subscribe-event')

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
        let token, userId

        beforeEach(async () => {

            const user = await User.create(new User({ name, surname, email, password }))

            userId = user.id

            const response = await fetch(`${API_URL}/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const { token: _token } = await response.json()

            token = _token

        })
        describe('when event exists', () => {
            let eventId
            beforeEach(async () => {
                const event = await Event.create(new Event({ title, description, location, date, publisher: userId }))

                eventId = event.id

            })

            it('should succeed adding userId into event subscribers array', async () => {

                await subscribeEvent(token, eventId)
                const event = await Event.findById(eventId)

                expect(event.subscribers).toContain(userId)
            })

            it('should succeed adding eventId into users subscribed array', async () => {

                await subscribeEvent(token, eventId)
                const user = await User.findById(userId)


                expect(user.subscribedEvents).toContain(eventId)
            })
        })
    })
    // TODO more happies and unhappies

    afterAll(async () => {
        await Promise.all([User.deleteMany(), Event.deleteMany()])
        return await mongoose.disconnect()
    })
})