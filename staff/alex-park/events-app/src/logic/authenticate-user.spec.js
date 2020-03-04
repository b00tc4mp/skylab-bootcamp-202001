const { authenticateUser } = require('.')
const { mongoose: { User }, mongoose } = require('events-data')
const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

describe('authenticateUser', () => {
    let name, surname, email, password

    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = 'email-' + Math.random()
        password = 'password-' + Math.random()
    })

    describe('when user already exists', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(() => { })


        )

        it('should succeed on correct credentials', () =>
            authenticateUser(email, password)
                .then(token => {
                    expect(token).toBeA('string')

                    const [header, payload, signature] = token.split('.')
                    expect(header.length).toBeGreaterThan(0)
                    expect(payload.length).toBeGreaterThan(0)
                    expect(signature.length).toBeGreaterThan(0)
                })
        )

        it('should fail on incorrect password', () =>
            authenticateUser(email, `${password}-wrong`)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe('email and/or password wrong')
                })
        )

        it('should fail on incorrect email', () =>
            authenticateUser(`${email}-wrong`, password)
                .then(() => { throw new Error('should not reach this point') })
                .catch(error => {
                    expect(error).toBeInstanceOf(Error)
                    expect(error.message).toBe('email and/or password wrong')
                })
        )

        afterEach(() =>
            fetch(`https://skylabcoders.herokuapp.com/api/v2/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
                .then(response => {
                    const { error: _error, token } = JSON.parse(response.content)

                    if (_error) throw new Error(_error)

                    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ password })
                    })
                        .then(response => {
                            if (response.content) {
                                const { error } = JSON.parse(response.content)

                                if (error) throw new Error(error)
                            }
                        })
                })
        )
    })

    it('should fail when user does not exist', () =>
        authenticateUser(email, password)
            .then(() => { throw new Error('should not reach this point') })
            .catch(error => {
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('email and/or password wrong')
            })
    )

    it('should fail on non-string email', () => {
        email = 1
        expect(() =>
            authenticateUser(email, password)
        ).toThrowError(TypeError, `email ${email} is not a string`)

        email = true
        expect(() =>
            authenticateUser(email, password)
        ).toThrowError(TypeError, `email ${email} is not a string`)

        email = undefined
        expect(() =>
            authenticateUser(email, password)
        ).toThrowError(TypeError, `email ${email} is not a string`)
    })

    it('should fail on non-string password', () => {
        password = 1
        expect(() =>
            authenticateUser(email, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)

        password = true
        expect(() =>
            authenticateUser(email, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)

        password = undefined
        expect(() =>
            authenticateUser(email, password)
        ).toThrowError(TypeError, `password ${password} is not a string`)
    })
})