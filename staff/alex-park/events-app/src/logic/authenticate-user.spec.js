import { authenticateUser } from '.'
const { models: { User }, mongoose } = require('events-data')
const { random } = Math
import atob from 'atob'

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

describe('authenticate-user', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })
    let name, surname, email, password

    beforeEach(async () => {
        name = 'name-' + random()
        surname = 'surname-' + random()
        email = 'email-' + random() + '@gmail.com'
        password = 'password-' + random()
    })

    describe('with an existing user', () => {
        beforeEach(async () =>
            await User.create({ name, surname, email, password })
        )

        it('should succeed on a existing user', async () => {

            const response = await authenticateUser(email, password)
            expect(response).toBeDefined()
            expect(typeof response).toBe('string')

            const [, payload] = response.split('.')
            const sub = JSON.parse(atob(payload)).sub

            const user = await User.findOne({ name, surname, email })

            expect(user.id).toBe(sub)
            return
        })

        it('should fail on wrong credentials', async () => {
            let _error
            try {
                await authenticateUser(email, `${password}-wrong`)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error.message).toBe('wrong credentials')
        })
    })


    describe('trying to register on invalid data', () => {
        it('should fail on a non string email', async () => {
            let _error
            email = 45438
            try {
                await authenticateUser(email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)

            email = false
            try {
                await authenticateUser(email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)

            email = undefined
            try {
                await authenticateUser(email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)

            email = []
            try {
                await authenticateUser(email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)
        })

        it('should fail on a non valid email address', async () => {
            let _error
            email = 'asjdvsdhjv'
            try {
                await authenticateUser(email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`${email} is not an e-mail`)

            email = '123@a'
            try {
                await authenticateUser(email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`${email} is not an e-mail`)
        })

        it('should fail on a non string password', async () => {
            let _error
            password = 45438
            try {
                await authenticateUser(email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)

            password = false
            try {
                await authenticateUser(email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)

            password = undefined
            try {
                await authenticateUser(email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)

            password = []
            try {
                await authenticateUser(email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)
        })
    })

    afterAll(async () => {
        await User.deleteMany()
        return await mongoose.disconnect()
    })
})