const API_URL = process.env.REACT_APP_API_URL
const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const { mongoose, models: { User, Event } } = require('events-data')
const { random } = Math
const PublishEvent = require('./publish-event')


describe('PublishEvent', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Promise.resolve([User.deleteMany(), Event.deleteMany()])
    })

    let name, surname, email, password, title, description, date, location, token, dummyToken

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTYwZDEwMDVjOGUwNDRhNTY2NmQ1NjEiLCJpYXQiOjE1ODM0MDMyNjgsImV4cCI6MTU4MzQwNjg2OH0.SKer8lVdk7TPhoUYVj88x_SL4JrvXdLka7I4ARk563Q'
        title = `title-${random()}`
        description = `description-${random()}`
        date = new Date
        location = `location-${random()}`
    })

    describe('when user already exists', () => {

        beforeEach(async () => {
            await User.create(({ name, surname, email, password }))
            user = await User.find({ email })
            const response = await fetch(`${API_URL}/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const { token: _token } = await response.json()

            token = _token

        }
        )

        it('should succeed on correct and valid and right data', async () => {

            await PublishEvent(token, title, description, location, date)
            const user = await User.findOne({ email })
            const event = await Event.findOne({ title, description, location, date, publisher: user._id })

            expect(event).toBeDefined()
            expect(event.title).toBe(title)
            expect(event.description).toBe(description)
            expect(event.date).toEqual(date)
            expect(event.location).toBe(location)
            expect(event.publisher.toString()).toBe(user.id)

        })

        it('should add event-id to the user published events', async () => {

            await PublishEvent(token, title, description, location, date)

            const event = await Event.findOne({ title, description, location, date })

            const _user = await User.findOne({ publishedEvents: event._id })
            expect(_user.publishedEvents).toContainEqual(event._id)


        })
    })


    it('should fail on non-string or empty token', () => {
        let token = 1
        expect(() => PublishEvent(token, title, description, location, date)).toThrow(TypeError, `token ${token} is not a string`)

        token = true
        expect(() => PublishEvent(token, title, description, location, date)).toThrow(TypeError, `token ${token} is not a string`)

        token = {}
        expect(() => PublishEvent(token, title, description, location, date)).toThrow(TypeError, `token ${token} is not a string`)

        token = ''
        expect(() => PublishEvent(token, title, description, location, date)).toThrow(Error, `token is empty`)
    })

    it('should fail on non-string or empty title', () => {
        let title = 1
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `title ${title} is not a string`)

        title = true
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `title ${title} is not a string`)

        title = {}
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `title ${title} is not a string`)

        title = ''
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(Error, `title is empty`)
    })

    it('should fail on non-string or empty description', () => {
        let description = 1
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `description ${description} is not a string`)

        description = true
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `description ${description} is not a string`)

        description = {}
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `description ${description} is not a string`)

        description = ''
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(Error, `description is empty`)
    })

    it('should fail on non-string or empty location', () => {
        let location = 1
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `location ${location} is not a string`)

        location = true
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `location ${location} is not a string`)

        location = {}
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `location ${location} is not a string`)

        location = ''
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(Error, `location is empty`)
    })

    it('should fail on non-date type or empty date', () => {
        let date = 1
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `date ${date} is not a Date`)

        date = true
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `date ${date} is not a Date`)

        date = {}
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(TypeError, `date ${date} is not a Date`)

        date = ''
        expect(() => PublishEvent(dummyToken, title, description, location, date)).toThrow(Error, `date ${date} is not a Date`)
    })




    afterAll(async () => {
        await mongoose.disconnect()
        return await Promise.resolve([User.deleteMany(), Event.deleteMany()])
    })
})