const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const TEST_JWT_SECRET = process.env.REACT_APP_JWT_SECRET
const { mongoose, models: { User, Event } } = require('events-data')
const { random } = Math
import PublishEvent from './publish-event'
import context from './context'
import jwt from 'jsonwebtoken'


describe('PublishEvent', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Promise.resolve([User.deleteMany(), Event.deleteMany()])
    })

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

        beforeEach(async () => {
            const user = await User.create(({ name, surname, email, password }))
            context.token = await jwt.sign({ sub: user.id }, TEST_JWT_SECRET)
        })

        it('should succeed on correct and valid and right data', async () => {

            await PublishEvent(title, description, location, date)
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

            await PublishEvent(title, description, location, date)

            const event = await Event.findOne({ title, description, location, date })

            const _user = await User.findOne({ publishedEvents: event._id })
            expect(_user.publishedEvents).toContainEqual(event._id)


        })
    })



    it('should fail on non-string or empty title', () => {
        let title = 1
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `title ${title} is not a string`)

        title = true
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `title ${title} is not a string`)

        title = {}
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `title ${title} is not a string`)

        title = ''
        expect(() => PublishEvent(title, description, location, date)).toThrow(Error, `title is empty`)
    })

    it('should fail on non-string or empty description', () => {
        let description = 1
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `description ${description} is not a string`)

        description = true
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `description ${description} is not a string`)

        description = {}
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `description ${description} is not a string`)

        description = ''
        expect(() => PublishEvent(title, description, location, date)).toThrow(Error, `description is empty`)
    })

    it('should fail on non-string or empty location', () => {
        let location = 1
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `location ${location} is not a string`)

        location = true
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `location ${location} is not a string`)

        location = {}
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `location ${location} is not a string`)

        location = ''
        expect(() => PublishEvent(title, description, location, date)).toThrow(Error, `location is empty`)
    })

    it('should fail on non-date type or empty date', () => {
        let date = 1
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `date ${date} is not a Date`)

        date = true
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `date ${date} is not a Date`)

        date = {}
        expect(() => PublishEvent(title, description, location, date)).toThrow(TypeError, `date ${date} is not a Date`)

        date = ''
        expect(() => PublishEvent(title, description, location, date)).toThrow(Error, `date ${date} is not a Date`)
    })




    afterAll(async () => {
        await mongoose.disconnect()
        return await Promise.resolve([User.deleteMany(), Event.deleteMany()])
    })
})