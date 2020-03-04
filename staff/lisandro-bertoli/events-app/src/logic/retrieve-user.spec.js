const { mongoose, models: { User } } = require('events-data')
const API_URL = process.env.REACT_APP_API_URL
const MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const { random } = Math
const { retrieveUser } = require('.')

describe('retrieveUser', () => {
    let name, surname, email, password


    beforeAll(async () => {
        await mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Promise.resolve(User.deleteMany())
    })

    beforeEach(() => {
        name = 'name-' + random()
        surname = 'surname-' + random()
        email = random() + '@mail.com'
        password = 'password-' + random()

    })
    describe('when user exists', () => {
        let token
        describe('when user is not deactivated', () => {
            beforeEach(async () => {
                await User.create({ name, surname, email, password })

                const response = await fetch(`${API_URL}/users/auth`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })

                const { token: _token } = await response.json()

                token = _token
            })

            it('should succeed on valid id, returning the user', async () => {
                const user = await retrieveUser(token)

                // expect(user.constructor).to.equal(Object)
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                // expect(user.email).toBe(email)
                // expect(user.password).toBeUndefined()

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

        let token = '507f1f77bcf86cd799439011'
        it('should fail throwing not-found-error', async () => {
            try {
                await retrieveUser(token)

                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe(`invalid token`)

            }

        })
    })

    it('should fail on non-string or empty id', () => {
        let token = 1
        expect(() => retrieveUser(token)).toThrow(TypeError, `token ${token} is not a string`)

        token = true
        expect(() => retrieveUser(token)).toThrow(TypeError, `token ${token} is not a string`)

        token = {}
        expect(() => retrieveUser(token)).toThrow(TypeError, `token ${token} is not a string`)

        token = ''
        expect(() => retrieveUser(token)).toThrow(Error, `token is empty`)
    })

    afterAll(async () => {
        await User.deleteMany({})

        return await mongoose.disconnect()
    })
})