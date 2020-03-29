require('dotenv').config()

const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Park, User } } = require('sick-parks-data')
const { NotAllowedError, NotFoundError } = require('sick-parks-errors')
const { random } = Math
const createPark = require('./create-park')

describe('createPark', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return Promise.all([User.deleteMany(), Park.deleteMany()])
    })

    let userName, surname, email, password
    let features = []
    let park = {}
    let featureName, featureSize

    beforeEach(() => {
        featureName = `rail`
        featureSize = `l`
        featureLocation = {
            coordinates: [random() * 15 + 1, random() * 15 + 1]
        }

        userName = `name${random()}`
        surname = `surname${random()}`
        email = `${random()}@mail.com`
        password = `password${random()}`

        park.name = `name${random()}`
        park.size = `l`
        park.flow = `flow${random()}`
        park.level = `intermediate`
        park.resort = `resort${random()}`
        park.description = `description${random()}`
        park.location = { coordinates: [random() * 15 + 1, random() * 15 + 1] }
    })

    describe('when user exists', () => {
        let userId
        beforeEach(async () => {
            const { id } = await User.create({ name: userName, surname, email, password })
            userId = id
            features.push({ name: featureName, size: featureSize, location: featureLocation })
        })

        it('should create a new park', async () => {
            const _id = await createPark(userId, { park, features })
            const _park = await Park.findById(_id).lean()

            expect(_park.name).to.equal(park.name)
            expect(_park.size).to.equal(park.size)
            expect(_park.level).to.equal(park.level)
            expect(_park.flow).to.equal(park.flow)
            expect(_park.resort).to.equal(park.resort)

            expect(_park.location.coordinates).to.deep.equal(park.location.coordinates)
            expect(_park.description).to.deep.equal(park.description)
            expect(_park.creator.toString()).to.equal(userId)
        })

        it('should add the park to the user', async () => {
            const _id = await createPark(userId, { park, features })
            const user = await User.findById(userId)

            expect(user.parks).to.include(_id)
        })

        it('should fail when park already exists', async () => {
            await Park.create(park)

            try {
                await createPark(userId, { park, features })
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.an.instanceOf(NotAllowedError)
                expect(error.message).to.equal(`park '${park.name}' already exists`)
            }

        })

        it('should fail and throw', async () => {
            await User.deleteMany()
            try {
                await createPark(userId, { park, features })
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user ${userId} does not exist`)
            }

        })

        afterEach(async () => {
            await User.deleteMany()

        })
    })

    after(() => Promise.all([User.deleteMany(), Park.deleteMany()]).then(() => mongoose.disconnect()))
})