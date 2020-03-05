//require('dotenv').config()

//const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process
const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
debugger
const { mongoose, models: { User } } = require('events-data')
//const { NotAllowedError } = require('events-errors')
const { registerUser, authenticate, retrieveUser } = require('./')

describe('retrieve-user', () => {

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })

    let name, surname, email, password, token, id, user

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = Math.random() + '@mail.com'
        password = 'password-' + Math.random()
    })

    it('should succeed on correct token and data user', async () => {
        user = await User.create({ name, surname, email, password })
        id = user.id
        token = await authenticate(email, password)
        const res = await retrieveUser(token)

        expect(token).toBeDefined()

        expect(res.name).toBe(name)
        expect(res.surname).toBe(surname)
        expect(res.email).toBe(email)
    })

    it('should fail on incorrect token', async () => {
        token = 1

        try{
            await retrieveUser(token)
        }catch(error){
            expect(error).toEqual(Error(`token ${token} is not a string`))
        }

        token = true

        try{
            await retrieveUser(token)
        }catch(error){
            expect(error).toEqual(TypeError(`token ${token} is not a string`))
        }

    })

    afterEach(() => {
       return User.deleteOne({ _id: id })
    })

    afterAll(async () => {
        await User.deleteMany()
        return await mongoose.disconnect()
    })
})