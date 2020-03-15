require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { NotFoundError } = require('sick-parks-errors')
const { mongoose, models: { User, Park, Location } } = require('sick-parks-data')
const { expect } = require('chai')
const { random } = Math
const publishComment = require('./publish-comment')


describe('publishComment', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await [User.deleteMany(), Park.deleteMany()]
    })

    let name, surname, email, password
    let parkName, size, level, location
    let body

    beforeEach(() => {
        body = { body: `text-${random()}` }


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
        })

        it('should succeed on creating a new comment in the park', async () => {
            await publishComment(userId, parkId, body)
            const park = await Park.findOne({ _id: parkId }).lean()


            expect(park).to.have.property("comments")
            expect(park.comments[0].body).to.equal(body.body)

        })

    })

    it('should fail on incorrect user id', async () => {
        let userId = 'asdfasdfsadf'
        let parkId = 'asdfasdfasfd'

        try {
            await publishComment(userId, parkId, body)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal(`user with id ${userId} does not exist`)
        }
    })

    it('should fail on incorrect parkId', async () => {
        const { id: userId } = await User.create({ name, surname, email, password })
        let parkId = 'asdfasdfasfd'

        try {
            await publishComment(userId, parkId, body)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.be.equal(`park with id ${parkId} does not exist`)
        }
    })

    after(() => Promise.all([User.deleteMany(), Park.deleteMany()]).then(() => mongoose.disconnect()))

})