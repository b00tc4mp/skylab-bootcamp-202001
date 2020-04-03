const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const { mongoose, models: { User } } = require('simonline-data')
const { register } = require('.')

describe('registerUser', () => {

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })

    let username, password, id

    beforeEach(() => {
        username = 'username-' + Math.random()
        password = 'password-' + Math.random()
    })

    it('should succeed on new user', async () => {
        const result = await register(username, password)

        expect(result).toBeUndefined()

        const user = await User.findOne({ username })
        debugger
        expect(typeof user).toBe('object')
        expect(user.username).toBe(username)
        expect(user.password).toBe(password)
    })

    it('should fail on already existing user', async () => {
        try{
            await register(username, password)
        }catch(error){
            expect(error).toBe(Error(`user with username "${username}" already exists`))
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