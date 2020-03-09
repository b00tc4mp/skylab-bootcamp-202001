require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require('simonline-data')
const registerUser = require('./register-user')
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('registerUser', () => {
    let username, password

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        username = `username-${random()}`
        password = `password-${random()}`
    })

    it('should succeed on correct user data', () =>
        registerUser(username, password)
            .then(result => {
                expect(result).not.to.exist
                expect(result).to.be.undefined

                return User.findOne({ username })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.username).to.equal(username)

                return bcrypt.compare(password, user.password)
            })
            .then(validPassword => expect(validPassword).to.be.true)
    )

    // TODO unhappy paths and other happies if exist

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})