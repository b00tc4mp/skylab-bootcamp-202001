require('dotenv').config()

const registerUser = require('./register-user')
const { expect } = require('chai')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('sick-parks-data')
const { NotAllowedError } = require('sick-parks-errors')
const bcrypt = require('bcryptjs')

describe('registerUser', () => {
    let name, surname, email, password

    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `${Math.random()}@email.com`
        password = `password-${Math.random()}`

    })

    it('should succed no creating a new user, no return value expected', () =>
        registerUser({ name, surname, email, password })
            .then(retVal => expect(retVal).to.be.undefined)
            .then(() => User.findOne({ email }))
            .then(user => {

                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.email).to.equal(email)
                expect(user.created).to.exist
                expect(user._id).to.exist

                return bcrypt.compare(password, user.password)
                    .then(validPassword => expect(validPassword).to.be.true)
            })

    )

    describe('when user already exists', () => {
        beforeEach(async () => {
            return await User.create({ name, surname, email, password })
        })

        it('should fail when user already exists', async () => {

            try {
                await registerUser({ name, surname, email, password })
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(NotAllowedError)
                expect(error.message).to.be.equal(`user ${email} already exists`)
            }
        })
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})