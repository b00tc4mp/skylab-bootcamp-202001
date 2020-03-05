import { registerUser } from '.'
const { models: { User }, mongoose } = require('events-data')
const { random } = Math
const { ContentError } = require('events-errors')

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

describe('registerUser', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })
    let name, surname, email, password

    beforeEach(() => {
        name = 'name-' + random()
        surname = 'surname-' + random()
        email = 'email-' + random() + '@gmail.com'
        password = 'password-' + random()
    })

    it('should succeed on new user', async () => {
        const response = await registerUser(name, surname, email, password)
        expect(response).toBeUndefined()

        const user = await User.findOne({ name, surname, email, password })
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.password).toBe(password)
        return
    })

    describe('when user already exists', () => {
        it('should fail on already existing user', async () => {
            let _error
            try {
                return await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error.message).toBe(`user with email "${email}" already exists`)

        })
    })

    describe('trying to register on invalid data', () => {

        it('should fail on a non string name', async () => {
            let _error
            name = 45438
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`name ${name} is not a string`)

            name = false
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`name ${name} is not a string`)

            name = undefined
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`name ${name} is not a string`)

            name = []
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`name ${name} is not a string`)
        })

        it('should fail on a non string surname', async () => {
            let _error
            surname = 45438
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`surname ${surname} is not a string`)

            surname = false
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`surname ${surname} is not a string`)

            surname = undefined
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`surname ${surname} is not a string`)

            surname = []
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`surname ${surname} is not a string`)
        })

        it('should fail on a non string email', async () => {
            let _error
            email = 45438
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)

            email = false
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)

            email = undefined
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)

            email = []
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)
        })

        it('should fail on a non valid email address', async () => {
            let _error
            email = 'asjdvsdhjv'
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`${email} is not an e-mail`)

            email = '123@a'
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`${email} is not an e-mail`)
        })

        it('should fail on a non string password', async () => {
            let _error
            password = 45438
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)

            password = false
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)

            password = undefined
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)

            password = []
            try {
                await registerUser(name, surname, email, password)
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