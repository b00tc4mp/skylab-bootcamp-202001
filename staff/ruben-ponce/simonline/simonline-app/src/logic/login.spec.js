const { random } = Math
const { mongoose, models: { User } } = require('simonline-data')
const { login } = require('.')
//const context = require('./context').default
import context from './context'

const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

describe('login', () => {
    beforeAll(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let username, password

    beforeEach(() => {
        username = `name-${random()}`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(async () => {

            await User.create({ username, password})
                .then(user => _id = user.id)
        })

        debugger
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

// const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
// const { mongoose, models: { User } } = require('simonline-data')
// const { login, retrieveUser } = require('.')

// describe('login', () => {

//     beforeAll(async () => {
//         await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//         return await User.deleteMany()
//     })

//     let username, password, id, _password

//     beforeEach(() => {
//         username = 'username-' + Math.random()
//         password = 'password-' + Math.random()
//     })

//     describe('when user already exists', () => {

//         let user, _id

//         beforeEach(async () => {

//             user = await User.create({ username, password })

//             _id = user.id

//             _password = await bcrypt.hash(password, 10)

//         })
        
//         it('should succeed on correct credentials', async () => {

//             let id = await login(username, _password)

//             let token = await id

//             expect(typeof token).toBe('string')
//             expect(token.length).not.toBe(0)

//             let _user = await retrieveUser(token)
            
//             expect(_user.username).toBe(user.username)
//         })

//         it('should fail on incorrect password', async () => {

//             try {
//                 await login(username, `${password}-wrong`)
//             } catch(error) {
//                 expect(error.message).toBe(`wrong credentials`)
//             }
//         })

//         it('should fail when user does not exist', async () => {

//             try {
//                 await login(`wrong-${username}`, password)
//             } catch(error) {
//                 expect(error.message).toEqual(`wrong credentials`)
//             }
//         })

//         it('should fail on non-string username', async () => {
            
//             try{
//                 username = 1
//                 await login(username, password)
//             }catch(error){
//                 expect(error).toEqual(TypeError(`username ${username} is not a string`))
//             }

//             try{
//                 username = true
//                 await login(username, password)
//             }catch(error){
//                 expect(error).toEqual(TypeError(`username ${username} is not a string`))
//             }

//             try{
//                 username = undefined
//                 await login(username, password)
//             }catch(error){
//                 expect(error).toEqual(TypeError(`username ${username} is not a string`))
//             }
//         })

//         it('should fail on non-string password', async () => {

//             try {
//                 username = '-' + Math.random()
//                 password = 1

//                 await login(username, password)
//             } catch (error) {
//                 expect(error).toEqual(TypeError(`password ${password} is not a string`))
//             }

//             try {
//                 username = '-' + Math.random()
//                 password = true

//                 await login(username, password)
//             } catch (error) {
//                 expect(error).toEqual(TypeError(`password ${password} is not a string`))
//             }

//             try {
//                 username = '-' + Math.random()
//                 password = undefined

//                 await login(username, password)
//             } catch (error) {
//                 expect(error).toEqual(TypeError(`password ${password} is not a string`))
//             }
//         })

//         afterEach(async () => {
//             return await User.deleteOne({ _id: id })
//         })

//         afterAll(async () => {
//             await User.deleteMany()
//             return await mongoose.disconnect()
//         })
//     })
// })