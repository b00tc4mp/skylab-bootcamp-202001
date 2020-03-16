const { random } = Math
const { mongoose, models: { User } } = require('karmark-data')
const { retrieveUser } = require('./index')
const jwt = require('jsonwebtoken')
const { ContentError, NotAllowedError } = require('karmark-errors')
const bcrypt = require('bcryptjs')
import context from './context'

const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

describe('retrieveUser', () => {
    let name, surname, username, password, _id

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

        await User.deleteMany()
    })

    beforeEach(async () => {  
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
    })

    beforeEach(async () => {
        const _password = await bcrypt.hash(password, 10)

        await User.create({ name, surname, username, password: _password })
            .then(user => _id = user.id)
    })

    it('it should succeed on correct credentials', async () => {
        const user = await retrieveUser()
        expect(user).toBeDefined()
        expect(user.name).toBe(name)
    })

    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))

})