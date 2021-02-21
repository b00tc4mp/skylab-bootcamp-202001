import authenticateUser from './authenticate-user'
const { mongoose, models: { User } } = require('events-data')
const { env: { REACT_APP_TEST_MONGODB_URL: MONGODB_URL } } = process
const { random } = Math

describe('authenticateUser', () => {
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

    describe('when user already exists', () => {
        beforeEach(async () =>
            await User.create(new User({ name, surname, email, password }))
        )

        it('should succeed on correct credentials', async () => {

            const token = await authenticateUser(email, password)

            expect(typeof token).toBe('string')

            const [header, payload, signature] = token.split('.')
            expect(header.length).toBeGreaterThan(0)
            expect(payload.length).toBeGreaterThan(0)
            expect(signature.length).toBeGreaterThan(0)

        })

        it('should fail on incorrect password', async () => {
            try {
                await authenticateUser(email, `${password}-wrong`)
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('wrong credentials')
            }
        })
    })

    it('should fail on incorrect email', async () => {
        try {
            await authenticateUser(`$wrong-${email}`, password)
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




