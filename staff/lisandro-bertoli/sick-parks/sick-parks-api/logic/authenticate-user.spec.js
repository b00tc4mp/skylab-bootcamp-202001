require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('sick-parks-data')
const { ContentError, NotAllowedError } = require('sick-parks-errors')
const { expect } = require('chai')
const { random } = Math
const authenticateUser = require('./authenticate-user')
const bcrypt = require('bcryptjs')

describe('authenticateUser', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)

            const user = await User.create(new User({ name, surname, email, password: _password }))

            _id = user.id
        })

        it('should succeed on valid credentials, returning user id', async () => {

            const id = await authenticateUser({ email, password })

            expect(id).to.be.a('string')
            expect(id.length).to.be.greaterThan(0)
            expect(id).to.equal(_id)

        })


        it('should fail on incorrect email', async () => {
            email = `wrong${email}`
            try {
                await authenticateUser({ email, password })
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(NotAllowedError)
                expect(error.message).to.equal('wrong credentials')
            }
        })

        it('should fail on incorecnt password', async () => {
            password = `wrong${email}`
            try {
                await authenticateUser({ email, password })
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(NotAllowedError)
                expect(error.message).to.equal('wrong credentials')
            }
        })
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})