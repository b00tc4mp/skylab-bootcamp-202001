require('dotenv').config()

const logic = require('.')
const { deletePark } = logic
const { TEST_JWT_SECRET: JWT_SECRET, TEST_MONGODB_URL: MONGODB_URL, TEST_API_URL: API_URL } = process.env
const jwt = require('jsonwebtoken')
const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { mongoose, models: { User, Park, Location } } = require('sick-parks-data')
const AsyncStorage = require('not-async-storage')
const { expect } = require('chai')
const { random } = Math

logic.__context__.storage = AsyncStorage
logic.__context__.API_URL = API_URL

describe('deletePark', () => {
    before(async () => {
        await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await [User.deleteMany(), Park.deleteMany()]
    })

    let name, surname, email, password
    let parkName, size, level, location
    let userId, parkId


    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}`
        password = `password-${random()}`

        parkName = `parkName-${random()}`
        size = `l`
        level = `begginer`
        location = new Location({ coordinates: [random() * 15 + 1, random() * 15 + 1] })

        return (async () => {
            const { _id } = await User.create({ name, surname, email, password })
            userId = _id.toString()

            const { id } = await Park.create({ name: parkName, size, level, location, creator: userId })
            parkId = id

            const _token = jwt.sign({ sub: userId }, JWT_SECRET)
            await logic.__context__.storage.setItem('token', _token)

        })()

    })

    describe('when park exists and user exist', () => {
        it('should succeed deleting the park from parks collection', async () => {
            await deletePark(userId, parkId)

            const park = await Park.findById(parkId)

            expect(park).to.equal(null)
        })

        it('should remove the park from the user parks', async () => {
            await deletePark(userId, parkId)

            const user = await User.findById(userId)

            const foundPark = user.parks.find(id => id === parkId)

            expect(foundPark).to.be.undefined
        })


    })

    describe('when invalid parkId is provided', () => {

        beforeEach(async () => await Park.deleteOne({ _id: parkId }))

        it('should fail on non existing park and throw ', async () => {
            try {
                await deletePark(userId, parkId)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`park ${parkId} does not exist`)
            }
        })

    })

    describe("when an invalid userId is provided", () => {

        beforeEach(async () => await User.deleteOne({ _id: userId }))

        it('should fail on non existing user and throw ', async () => {
            try {
                await deletePark(userId, parkId)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user ${userId} does not exist`)
            }
        })

        it('should fail on incorrect user as park creator and throw', async () => {
            const { id } = await User.create({ name, surname, email, password })

            const _token = jwt.sign({ sub: id }, JWT_SECRET)
            await logic.__context__.storage.setItem('token', _token)

            try {
                await deletePark(userId, parkId)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(NotAllowedError)
                expect(error.message).to.equal(`user ${id} did not create this park`)
            }
        })
    })



    it('should fail on non-string or park id', () => {
        let parkId = 1
        expect(() => deletePark(userId, parkId)).to.throw(TypeError, `parkId ${parkId} is not a string`)

        parkId = true
        expect(() => deletePark(userId, parkId)).to.throw(TypeError, `parkId ${parkId} is not a string`)

        parkId = {}
        expect(() => deletePark(userId, parkId)).to.throw(TypeError, `parkId ${parkId} is not a string`)

        parkId = ''
        expect(() => deletePark(userId, parkId)).to.throw(Error, `parkId is empty`)
    })


    after(() => Promise.all([User.deleteMany(), Park.deleteMany()]).then(() => mongoose.disconnect()))

})