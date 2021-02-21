const registerUser = require('./register-user')
const { mongoose, models: { User } } = require('events-data')
const { env: { REACT_APP_TEST_MONGODB_URL: MONGODB_URL } } = require('process')
const { random } = Math
const bcrypt = require('bcryptjs')


describe('registerUser', () => {
    beforeAll(async () => {
        await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Promise.resolve(User.deleteMany())
    })


    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on new user', async () => {
        const response = await registerUser(name, surname, email, password)

        expect(response).toBeUndefined()

        const user = await User.findOne({ email })
        debugger
        expect(user).toBeDefined()
        expect(typeof user.id).toBe('string')
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.created).toBeInstanceOf(Date)

        const validPassowrd = bcrypt.compare(password, user.password)
        expect(validPassowrd).toBeTruthy() // TODO encrypt this field!
    })

    describe('when user already exists', () => {
        beforeEach(async () => {
            try {
                return await fetch('http://localhost:8080/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, surname, email, password })
                })

            } catch (error) {
                throw new Error(error)
            }
        })

        it('should fail on already existing user', async () => {
            try {
                await registerUser(name, surname, email, password)

                throw new Error('should not reach this point')
            } catch (error) {

                expect(error).toBeDefined()
                expect(error.message).toBe(`user ${email} already exists`)
            }

        })
    })

    afterAll(async () => {
        await Promise.resolve(User.deleteMany())
        return await mongoose.disconnect()
    })
})


