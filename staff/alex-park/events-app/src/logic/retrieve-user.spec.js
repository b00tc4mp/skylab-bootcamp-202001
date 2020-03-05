import {retrieveUser} from '.'
const jwt = require('jsonwebtoken')
const { models: { User }, mongoose } = require('events-data')
const { random } = Math
const { ContentError } = require('events-errors')

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET
const JWT_EXP = process.env.REACT_APP_JWT_EXP

describe('retrieveUser', () => {
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

    describe('when the user exists and can be retrieved', () => {
        let id, _token
        beforeEach(async () => {
            await User.create({ name, surname, email, password })
            const response = await User.findOne({ name, surname, email, password })
            
            id = response.id

            const token = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: JWT_EXP })

            _token = token.toString()
            
            return _token
        })

        it('should succeed on new a valid user retrieval', async () => {
            const user = await retrieveUser(_token)
            expect(user).toBeDefined()
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user._id).toBe(id)

            return
        })

        afterEach(async () => await User.deleteMany())
    })

    describe('when the user cannot be retrieved', () => {
        let _id, token
        beforeEach(async () => {
            await User.create({ name, surname, email, password })
            const { id } = User.findOne({ name, surname, email, password })
            _id = id

            token = await jwt.sign({ sub: _id }, JWT_SECRET, { expiresIn: JWT_EXP })
            await User.deleteMany()

            return token
        })

        it('should fail when the user cannot be retrieved', async () => {

            let _error
            try {
                return await retrieveUser(token)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error.message).toBe(`user with id ${_id} does not exist`)

        })
    })

    // describe('trying to register on invalid data', () => {

    //     it('should fail on a non string password', async () => {
    //         let _error
    //         password = 45438
    //         try {
    //             await retrieveUser(name, surname, email, password)
    //         } catch (error) {
    //             _error = error
    //         } expect(_error.message).toBe(`password ${password} is not a string`)

    //         password = false
    //         try {
    //             await retrieveUser(name, surname, email, password)
    //         } catch (error) {
    //             _error = error
    //         } expect(_error.message).toBe(`password ${password} is not a string`)

    //         password = undefined
    //         try {
    //             await retrieveUser(name, surname, email, password)
    //         } catch (error) {
    //             _error = error
    //         } expect(_error.message).toBe(`password ${password} is not a string`)

    //         password = []
    //         try {
    //             await retrieveUser(name, surname, email, password)
    //         } catch (error) {
    //             _error = error
    //         } expect(_error.message).toBe(`password ${password} is not a string`)
    //     })

    // })

    afterAll(async () => {
        await User.deleteMany()
        return await mongoose.disconnect()
    })
})