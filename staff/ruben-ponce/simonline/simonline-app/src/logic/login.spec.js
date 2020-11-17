const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('simonline-data')
const {login} = require('.')

describe('login-user', () => {

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })

    let username, password, id

    beforeEach(() => {
        username = 'name-' + Math.random()
        password = 'password-' + Math.random()
    })

    describe('when user already exists', () => {

        let user, _id

        beforeEach(async () => {

            user = await User.create({ username, password })

            return _id = user.id
        })
        
        it('should succeed on correct credentials', async () => {

            let id = await login(username, password)
            debugger
            let token = await id

            expect(typeof token).toBe('string')
            expect(token.length).not.toBe(0)
        })

        it('should fail on incorrect password', async () => {

            try {
                await login(username, `${username}-wrong`)
            } catch(error) {
                expect(error.message).toBe(`wrong credentials`)
            }
        })

        it('should fail when user does not exist', async () => {

            try {
                await login(`wrong-${username}`, password)
            } catch(error) {
                expect(error.message).toEqual(`wrong credentials`)
            }
        })

        it('should fail on non-string username', async () => {
            
            try{
                username = 1
                await login(username, password)
            }catch(error){
                expect(error).toEqual(TypeError(`username ${username} is not a string`))
            }

            try{
                username = true
                await login(username, password)
            }catch(error){
                expect(error).toEqual(TypeError(`username ${username} is not a string`))
            }

            try{
                username = undefined
                await login(username, password)
            }catch(error){
                expect(error).toEqual(TypeError(`username ${username} is not a string`))
            }
        })

        it('should fail on non-string password', async () => {

            try {
                username = '-' + Math.random()
                password = 1

                await login(username, password)
            } catch (error) {
                expect(error).toEqual(TypeError(`password ${password} is not a string`))
            }

            try {
                username = '-' + Math.random()
                password = true

                await login(username, password)
            } catch (error) {
                expect(error).toEqual(TypeError(`password ${password} is not a string`))
            }

            try {
                username = '-' + Math.random()
                password = undefined

                await login(username, password)
            } catch (error) {
                expect(error).toEqual(TypeError(`password ${password} is not a string`))
            }
        })

        afterEach(async () => {
            return await User.deleteOne({ _id: id })
        })

        afterAll(async () => {
            await User.deleteMany()
            return await mongoose.disconnect()
        })
    })
})