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

    it('should succeed registered on correct user data', () =>
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

    it('should fail on already user exist', () => {
        expect(() => 
            registerUser(username, password)
            .then(error => {
                expect(error).to.eql(Error(`user with username "${username}" already exists`))
            })
        )
    })

    it('should fail register on invalid username', () => {

        username = 1
        password = 1

        expect(() => 
            registerUser(username, password)
            .then(error => {
                expect(error).to.eql(Error(`user with username "${username}" is not a string`))
            })
        )

        username = ''
        password = 1

        expect(() => 
            registerUser(username, password)
            .then(error => {
                expect(error).to.eql(Error(`user with username "${username}" is not a string`))
            })
        )

        username = false
        password = 1

        expect(() => 
            registerUser(username, password)
            .then(error => {
                expect(error).to.eql(Error(`user with username "${username}" is not a string`))
            })
        )

        username = undefined
        password = 1

        expect(() => 
            registerUser(username, password)
            .then(error => {
                expect(error).to.eql(Error(`user with username "${username}" is not a string`))
            })
        )

        username = []
        password = 1

        expect(() => 
            registerUser(username, password)
            .then(error => {
                expect(error).to.eql(Error(`user with username "${username}" is not a string`))
            })
        )
    })

    it('should fail register on invalid password', () => {

        username = 'username'
        password = 1

        expect(() => 
            registerUser(username, password)
            .then(error => {
                expect(error).to.eql(Error(`user with password "${password}" is not a string`))
            })
        )

        username = 'username'
        password = false

        expect(() => 
            registerUser(username, password)
            .then(error => {
                expect(error).to.eql(Error(`user with password "${password}" is not a string`))
            })
        )

        username = 'username'
        password = 1

        expect(() => 
            registerUser(username, password)
            .then(error => {
                expect(error).to.eql(Error(`user with password "${password}" is not a string`))
            })
        )
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})