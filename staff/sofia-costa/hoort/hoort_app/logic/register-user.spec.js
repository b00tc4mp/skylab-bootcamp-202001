const registerUser = require('./register-user')
const { mongoose, models: { User } } = require('../hoort-data')
const { env: { REACT_APP_TEST_MONGODB_URL: MONGODB_URL } } = require('process')
const { random } = Math
const bcrypt = require('bcryptjs')
const fetch = require('node-fetch')


describe('registerUser', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/test-hoort', { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })

    let name, username, email, password

    beforeEach(() => {
        name = `name-${random()}`
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on new user', async () => {
        const response = await registerUser(name, username, email, password)

        expect(response).toBeUndefined()

        const user = await User.findOne({ email })
        expect(user).toBeDefined()
        expect(typeof user.id).toBe('string')
        expect(user.name).toBe(name)
        expect(user.username).toBe(username)
        expect(user.email).toBe(email)
        expect(user.created).toBeInstanceOf(Date)

        const validPassowrd = bcrypt.compare(password, user.password)
        expect(validPassowrd).toBeTruthy()
    })

    describe('when user already exists', () => {
        beforeEach(async () => {
            try {
                return await fetch('http://192.168.1.146:8085/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, username, email, password })
                })

            } catch (error) {
                throw new Error(error)
            }
        })

        it('should fail on already existing user', async () => {
            try {
                await registerUser(name, username, email, password)

                throw new Error('should not reach this point')
            } catch (error) {

                expect(error).toBeDefined()
                expect(error.message).toBe(`user with email ${email} already exists`)
            }

        })
    })

    afterAll(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
        return
    })
})
