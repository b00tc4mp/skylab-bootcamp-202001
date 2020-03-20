require('dotenv').config()

const logic = require('.')
const { createPark } = logic
const AsyncStorage = require('not-async-storage')
const { expect } = require('chai')

const TEST_JWT_SECRET = process.env.JWT_SECRET
const { mongoose, models: { Park, User } } = require('sick-parks-data')
const { random } = Math
const jwt = require('jsonwebtoken')

logic.__context__.storage = AsyncStorage

describe('createPark', () => {
    before(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-sick-parks', { useNewUrlParser: true, useUnifiedTopology: true })
        return Promise.all([User.deleteMany(), Park.deleteMany()])
    })

    let userName, surname, email, password, token
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

            const _token = jwt.sign({ sub: id }, TEST_JWT_SECRET)
            await logic.__context__.storage.setItem('token', _token)
        })

        it('should create a new park', async () => {
            await createPark({ park, features })
            const _park = await Park.findOne({ name: park.name }).lean()

            expect(_park.name).to.equal(park.name)
            expect(_park.size).to.equal(park.size)
            expect(_park.level).to.equal(park.level)
            expect(_park.flow).to.equal(park.flow)
            expect(_park.resort).to.equal(park.resort)

            expect(_park.location.coordinates).to.deep.equal(park.location.coordinates)
            expect(_park.description).to.equal(park.description)
            expect(_park.creator.toString()).to.equal(userId)
        })

        it('should add the park to the user', async () => {
            await createPark({ park, features })
            const user = await User.findById(userId)
            const _park = await Park.findOne({ name: park.name }).lean()

            expect(user.parks).to.include(_park._id)
        })
    })

    after(() => Promise.all([User.deleteMany(), Park.deleteMany()]).then(() => mongoose.disconnect()))
})