const { random } = Math
const { mongoose, models: { User } } = require('./../../../Js-Drone-DATA')
const { login } = require('.')
const bcrypt = require('bcryptjs')
import context from './context'

const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process
console.log(TEST_MONGODB_URL)
describe('login', () => {
    beforeAll(() =>
    
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, username, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)

            await User.create({ name, surname, username, password: _password })
                .then(user => _id = user.id)
        })

        it('should succeed on correct and valid and right credentials', () =>
            login(username, password)
                .then(() => {
                    const { token } = context

                    expect(typeof token).toBe('string')
                    expect(token.length).toBeGreaterThan(0)

                    const { sub } = JSON.parse(atob(token.split('.')[1]))

                    expect(sub).toBe(_id)
                })
        )
    })

    // TODO more happies and unhappies

    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
})