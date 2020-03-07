const { mongoose, models: { User } } = require('events-data')
const TEST_JWT_SECRET = process.env.REACT_APP_JWT_SECRET
const MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const { random } = Math
const { retrieveUser } = require('.')
import context from './context'
const jwt = require('jsonwebtoken')


describe('retrieveUser', () => {
    let name, surname, email, password


    beforeAll(async () => {
        await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        context.clear()
        return await Promise.resolve(User.deleteMany())
    })

    beforeEach(() => {
        name = 'name-' + random()
        surname = 'surname-' + random()
        email = random() + '@mail.com'
        password = 'password-' + random()

    })
    describe('when user exists', () => {

        describe('when user is not deactivated', () => {
            beforeEach(async () => {
                const user = await User.create({ name, surname, email, password })

                context.token = await jwt.sign({ sub: user.id }, TEST_JWT_SECRET)
            })

            it('should succeed on valid id, returning the user', async () => {
                const user = await retrieveUser()

                expect(user.constructor).toBe(Object)
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(user.password).toBeUndefined()

            })

            afterEach(() => {
                context.clear()
            })
        })
        // describe('when user is deactivated', () => {
        //     beforeEach(() => {
        //         const user = { id, name, surname, email, password, created: new Date, deactivated: true }

        //         users.push(user)

        //         return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
        //     })
        //     it('should throw not-allowed-error', () => {
        //         expect(() => {
        //             retrieveUser(id)
        //         }).to.throw(NotAllowedError, `user with id ${id} is deactivated`)
        //     })
        // }) TODO
    })

    describe('when user does not exist', () => {
        it('should fail throwing jwt malformed', async () => {
            try {
                await retrieveUser()

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(`jwt malformed`)

            }

        })
    })


    afterAll(async () => {
        await User.deleteMany({})
        context.clear()
        return await mongoose.disconnect()
    })
})