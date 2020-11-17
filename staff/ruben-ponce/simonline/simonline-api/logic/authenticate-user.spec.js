require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('simonline-data')
const { expect } = require('chai')
const { random } = Math
const authenticateUser = require('./authenticate-user')
const { ContentError } = require('simonline-errors')
const bcrypt = require('bcryptjs')

describe('authenticateUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let username, password

    beforeEach(() => {
        username = `username-${random()}`
        password = `password-${random()}`
    })

    describe('when username already exists', () => {
        let _id

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ username, password })
                )
                .then(user => _id = user.id)
        )

        it('should succeed on correct and valid credentials', () => {
            authenticateUser(username, password)
                .then(id => {
                    expect(id).to.be.a('string')
                    expect(id.length).to.be.greaterThan(0)
                    expect(id).to.equal(_id)
                })
        })

        it('should fail on incorrect username', () => {
            authenticateUser(`${username}-wrong`, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({ message }) => expect(message).to.equal(`wrong credentials`))
        })

        it('should fail on incorrect password', () => {
            authenticateUser(username, `${password}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({ message }) => expect(message).to.equal(`wrong credentials`))
        })
    })

    describe('unhappy paths', () => {

        it('should fail on non-string username', () => {
            username = 1
            expect(() =>
                authenticateUser(username, password)
            ).to.throw(TypeError, `username ${username} is not a string`)
    
            username = true
            expect(() =>
                authenticateUser(username, password)
            ).to.throw(TypeError, `username ${username} is not a string`)
    
            username = undefined
            expect(() =>
                authenticateUser(username, password)
            ).to.throw(TypeError, `username ${username} is not a string`)

            username = []
            expect(() =>
                authenticateUser(username, password)
            ).to.throw(TypeError, `username ${username} is not a string`)

            username = ''
            expect(() =>
                authenticateUser(username, password)
            ).to.throw(ContentError, 'username is empty')
        })

        it('should fail on non-string password', () => {
            username = 'username-test'
            password = 1
            expect(() =>
                authenticateUser(username, password)
            ).to.throw(TypeError, `password ${password} is not a string`)
    
            password = true
            expect(() =>
                authenticateUser(username, password)
            ).to.throw(TypeError, `password ${password} is not a string`)
    
            password = undefined
            expect(() =>
                authenticateUser(username, password)
            ).to.throw(TypeError, `password ${password} is not a string`)

            password = []
            expect(() =>
                authenticateUser(username, password)
            ).to.throw(TypeError, `password ${password} is not a string`)

            password = ''
            expect(() =>
                authenticateUser(username, password)
            ).to.throw(ContentError, 'password is empty')
        })
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})