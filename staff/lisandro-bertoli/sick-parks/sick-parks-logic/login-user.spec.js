const logic = require('.')
const { loginUser } = logic
const { random } = Math
const { expect } = require('chai')
const AsyncStorage = require('not-async-storage')

const { mongoose, models: { User } } = require('sick-parks-data')
const bcrypt = require('bcryptjs')

logic.__context__.storage = AsyncStorage

describe('loginUser', () => {
    before(async () => {
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

            const returnValue = await loginUser({ email, password })

            expect(returnValue).to.be.undefined

            const token = await logic.__context__.storage.getItem('token')

            const [header, payload, signature] = token.split('.')
            expect(header.length).to.be.greaterThan(0)
            expect(payload.length).to.be.greaterThan(0)
            expect(signature.length).to.be.greaterThan(0)

        })

        it('should fail on incorrect password', async () => {
            password = `${password}-wrong`
            try {
                await loginUser({ email, password })
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal('wrong credentials')
            }
        })
    })

    it('should fail on incorrect email', async () => {
        email = `wrong-${email}`
        try {
            await loginUser({ email, password })
            throw new Error('should not reach this point')

        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal('wrong credentials')
        }

    })
    after(async () => {
        await Promise.resolve(User.deleteMany())
        return await mongoose.disconnect()
    })
})
