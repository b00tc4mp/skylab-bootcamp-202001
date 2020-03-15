
import login from './login'
const { mongoose, models: { User } } = require('../sick-parks-data')
//const { env: { REACT_APP_TEST_MONGODB_URL: MONGODB_URL } } = require('process')
const { random } = Math
const bcrypt = require('bcryptjs')
import context from './context'

describe('login', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-sick-parks', { useNewUrlParser: true, useUnifiedTopology: true })
        return await Promise.resolve(User.deleteMany())
    })

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)

            await User.create(new User({ name, surname, email, password: _password }))
        })

        it('should succeed on correct credentials', async () => {

            const returnValue = await login({ email, password })

            expect(returnValue).toBeUndefined()


            const [header, payload, signature] = context.token.split('.')
            expect(header.length).toBeGreaterThan(0)
            expect(payload.length).toBeGreaterThan(0)
            expect(signature.length).toBeGreaterThan(0)

        })

        it('should fail on incorrect password', async () => {
            try {
                await login(email, `${password}-wrong`)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('wrong credentials')
            }
        })
    })

    it('should fail on incorrect email', async () => {
        try {
            await login(`$wrong-${email}`, password)
            throw new Error('should not reach this point')

        } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('wrong credentials')
        }

    })
    afterAll(async () => {
        await Promise.resolve(User.deleteMany())
        return await mongoose.disconnect()
    })
})
