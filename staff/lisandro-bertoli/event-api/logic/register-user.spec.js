require('dotenv').config()

const registerUser = require('./register-user')
const { expect } = require('chai')
const mongoose = require('mongoose')
const { env: { TEST_MONGODB_URL } } = process
const { models: { User } } = require('../data')

describe('registerUser', () => {
    let name, surname, email, password

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    )

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `${Math.random()}@email.com`
        password = `password-${Math.random()}`

    })

    it('should succed no creating a new user, no return value expected', () =>
        registerUser(name, surname, email, password)
            .then(retVal => expect(retVal).to.be.undefined)
            .then(() => User.findOne({ email }))
            .then(user => {

                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)

                expect(user.created).to.exist
                expect(user._id).to.exist
            })

    )

    after(() => mongoose.disconnect())
})

