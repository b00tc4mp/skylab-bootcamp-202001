require('dotenv').config()
import createPark from './create-park'

const TEST_MONGODB_URL = process.env.REAC_APP_TEST_MONGODB_URL
const TEST_JWT_SECRET = process.env.REACT_APP_JWT_SECRET
const { mongoose, models: { Park, User } } = require('../sick-parks-data')
const { random } = Math
const jwt = require('jsonwebtoken')

describe('createPark', () => {
    beforeAll(async () => {
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

            token = jwt.sign({ sub: id }, TEST_JWT_SECRET)

        })

        it('should create a new park', async () => {
            await createPark(token, { park, features })
            const _park = await Park.findOne({ name: park.name }).lean()

            expect(_park.name).toBe(park.name)
            expect(_park.size).toBe(park.size)
            expect(_park.level).toBe(park.level)
            expect(_park.flow).toBe(park.flow)
            expect(_park.resort).toBe(park.resort)

            expect(_park.location.coordinates).toEqual(expect.arrayContaining(park.location.coordinates))
            expect(_park.description).toBe(park.description)
            expect(_park.creator.toString()).toBe(userId)
        })

        it('should add the park to the user', async () => {
            await createPark(token, { park, features })
            const user = await User.findById(userId)
            const _park = await Park.findOne({ name: park.name }).lean()

            expect(user.parks).toContainEqual(_park._id)
        })
    })

    afterAll(() => Promise.all([User.deleteMany(), Park.deleteMany()]).then(() => mongoose.disconnect()))
})