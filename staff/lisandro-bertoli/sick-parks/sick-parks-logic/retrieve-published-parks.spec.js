require('dotenv').config()


const { mongoose, models: { Park, User, Location } } = require('sick-parks-data')
const logic = require('.')
const { retrievePublishedParks } = logic
const AsyncStorage = require('not-async-storage')
const TEST_MONGODB_URL = process.env.TEST_MONGODB_URL
const { expect } = require('chai')
const { NotFoundError } = require('sick-parks-errors')
const jwt = require('jsonwebtoken')
const TEST_JWT_SECRET = process.env.JWT_SECRET

const { random } = Math

logic.__context__.storage = AsyncStorage


describe('retrievePublishedParks', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await [Park.deleteMany(), User.deleteMany()]
    })

    let parkName, size, level, location
    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}`
        password = `password-${random()}`


        parkName = `parkName-${random()}`
        size = `l`
        description = `${random()}`
        resort = `${random()}`
        level = `begginer`
        location = new Location({ coordinates: [random() * 15 + 1, random() * 15 + 1] })
    })

    describe('when user and park exist', () => {
        let parkId

        beforeEach(async () => {

            const { id } = await User.create({ name, surname, email, password })


            const park = await Park.create({ name: parkName, size, level, resort, description, location, creator: id })
            parkId = park.id
            const _token = jwt.sign({ sub: id }, TEST_JWT_SECRET)
            await logic.__context__.storage.setItem('token', _token)
        })

        it('should succeed on correct credentials', async () => {
            const result = await retrievePublishedParks()

            expect(result[0].name).to.equal(parkName)
            expect(result[0].id).to.equal(parkId)
            expect(result[0].resort).to.equal(resort)
            expect(result[0].size).to.equal(size)
            expect(result[0].verified).to.exist
        })
    })
    describe('when user has no parks', () => {
        beforeEach(async () => {
            const { id } = await User.create({ name, surname, email, password })
            const _token = jwt.sign({ sub: id }, TEST_JWT_SECRET)
            await logic.__context__.storage.setItem('token', _token)

        })

        it('should fail returning empty array', async () => {

            const result = await retrievePublishedParks()

            expect(result).to.be.instanceOf(Array)
            expect(result.length).to.equal(0)


        })

    })


    after(() => Promise.all([Park.deleteMany(), User.deleteMany()]).then(() => mongoose.disconnect()))
})