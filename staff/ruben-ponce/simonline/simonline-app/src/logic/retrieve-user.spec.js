const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const { mongoose, models: { User } } = require('simonline-data')
const { authenticate, retrieveUser } = require('./')

describe('retrieve-user', () => {

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })

    let username, password, token, id, user

    beforeEach(() => {
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    it('should succeed on correct token and data user', async () => {
        user = await User.create({ username, password })
        id = user.id
        token = await authenticate(username, password)
        const res = await retrieveUser(token)

        expect(token).toBeDefined()

        expect(res.username).toBe(username)
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