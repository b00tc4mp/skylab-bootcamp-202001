require('dotenv').config()

const logic = require('.')
const { publishComment } = logic
const { NotFoundError } = require('sick-parks-errors')
const { mongoose, models: { User, Park, Location } } = require('sick-parks-data')
const { expect } = require('chai')
const { random } = Math
const AsyncStorage = require('not-async-storage')
const { TEST_JWT_SECRET: JWT_SECRET, TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } = process.env
const jwt = require('jsonwebtoken')

logic.__context__.storage = AsyncStorage
logic.__context__.API_URL = API_URL

describe.only('publishComment', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await [User.deleteMany(), Park.deleteMany()]
    })

    let name, surname, email, password
    let parkName, size, level, location
    let body

    beforeEach(() => {
        body = `text-${random()}`


        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}`
        password = `password-${random()}`

        parkName = `parkName-${random()}`
        size = `l`
        level = `begginer`
        location = new Location({ coordinates: [random() * 15 + 1, random() * 15 + 1] })
    })


    describe('when park and user already exist', () => {
        let parkId, userId

        beforeEach(async () => {
            const { id } = await User.create({ name, surname, email, password })
            userId = id

            const { id: _id } = await Park.create({ name: parkName, size, level, location })
            parkId = _id

            const _token = jwt.sign({ sub: id }, JWT_SECRET)
            await logic.__context__.storage.setItem('token', _token)
        })

        it('should succeed on creating a new comment in the park', async () => {
            await publishComment(userId, parkId, body)
            const park = await Park.findOne({ _id: parkId }).lean()
            debugger

            expect(park).to.have.property("comments")
            expect(park.comments[0].body).to.equal(body)

        })

    })

    describe('when park does not exist/incorrect park id', () => {
        let userId
        let parkId = 'asdfasdfasfd'
        beforeEach(async () => {
            const { id } = await User.create({ name, surname, email, password })
            userId = id

            const _token = jwt.sign({ sub: id }, JWT_SECRET)
            await logic.__context__.storage.setItem('token', _token)
        })

        it('should fail and throw', async () => {
            try {
                await publishComment(userId, parkId, body)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.be.equal(`park with id ${parkId} does not exist`)
            }
        })

        describe('when user does not exist', () => {
            let parkId
            let userId = 'asdfasdfasfd'
            beforeEach(async () => {
                const { id: _id } = await Park.create({ name: parkName, size, level, location })
                parkId = _id

                const _token = jwt.sign({ sub: userId }, JWT_SECRET)
                await logic.__context__.storage.setItem('token', _token)
            })

            it('should fail on incorrect user id', async () => {
                try {
                    await publishComment(userId, parkId, body)
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.be.equal(`user with id ${userId} does not exist`)
                }
            })

        })

    })

    it('should fail on non-string userId', () => {
        userId = 1
        parkId = 'string'
        expect(() => publishComment(userId, parkId, body)).to.Throw(TypeError, `userId ${userId} is not a string`)

        userId = undefined
        parkId = 'string'
        expect(() => publishComment(userId, parkId, body)).to.Throw(TypeError, `userId is empty`)

        userId = true
        parkId = 'string'
        expect(() => publishComment(userId, parkId, body)).to.Throw(TypeError, `userId ${userId} is not a string`)

    })

    it('should fail on non-string parkId', () => {
        parkId = 1
        userId = 'string'
        expect(() => publishComment(userId, parkId, body)).to.Throw(TypeError, `parkId ${parkId} is not a string`)

        parkId = undefined
        userId = 'string'
        expect(() => publishComment(userId, parkId, body)).to.Throw(TypeError, `parkId is empty`)

        parkId = true
        userId = 'string'
        expect(() => publishComment(userId, parkId, body)).to.Throw(TypeError, `parkId ${parkId} is not a string`)

    })

    it('should fail on non-string problem', () => {
        parkId = 'string'
        userId = 'string'
        body = 1
        expect(() => publishComment(userId, parkId, body)).to.Throw(TypeError, `body ${body} is not a string`)

        parkId = 'string'
        userId = 'string'
        body = undefined
        expect(() => publishComment(userId, parkId, body)).to.Throw(TypeError, `body is empty`)

        parkId = 'string'
        userId = 'string'
        body = true
        expect(() => publishComment(userId, parkId, body)).to.Throw(TypeError, `body ${body} is not a string`)

    })


    after(() => Promise.all([User.deleteMany(), Park.deleteMany()]).then(() => mongoose.disconnect()))

})