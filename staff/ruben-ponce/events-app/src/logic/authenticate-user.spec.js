const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const { mongoose, models: { User } } = require('events-data')
const { authenticate, retrieveUser } = require('./')

describe('authenticate-user', () => {

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await User.deleteMany()
    })

    let name, surname, email, password, id

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = Math.random() + '@mail.com'
        password = 'password-' + Math.random()
    })

    describe('when user already exists', () => {

        let user, _id

        beforeEach(async () => {

            user = await User.create({ name, surname, email, password })

            return _id = user.id
        })
        
        it('should succeed on correct credentials', async () => {

            let id = await authenticate(email, password)

            let token = await id

            expect(typeof token).toBe('string')
            expect(token.length).not.toBe(0)

            let _user = await retrieveUser(token)
            
            expect(_user.email).toBe(user.email)
            expect(_user.name).toBe(user.name)
            expect(_user.surname).toBe(user.surname)
        })

        it('should fail on incorrect password', async () => {

            try {
                await authenticate(email, `${password}-wrong`)
            } catch(error) {
                expect(error.message).toBe(`wrong credentials`)
            }
        })

        it('should fail when user does not exist', async () => {

            try {
                await authenticate(`wrong-${email}`, password)
            } catch(error) {
                expect(error.message).toEqual(`wrong credentials`)
            }
        })

        it('should fail on non-string email', async () => {
            
            try{
                email = 1
                await authenticate(email, password)
            }catch(error){
                expect(error).toEqual(TypeError(`email ${email} is not a string`))
            }

            try{
                email = true
                await authenticate(email, password)
            }catch(error){
                expect(error).toEqual(TypeError(`email ${email} is not a string`))
            }

            try{
                email = undefined
                await authenticate(email, password)
            }catch(error){
                expect(error).toEqual(TypeError(`email ${email} is not a string`))
            }
        })

    it('should fail on non-string password', async () => {

        try {
            email = '-' + Math.random() + '@mail.com'
            password = 1

            await authenticate(email, password)
        } catch (error) {
            expect(error).toEqual(TypeError(`password ${password} is not a string`))
        }

        try {
            email = '-' + Math.random() + '@mail.com'
            password = true

            await authenticate(email, password)
        } catch (error) {
            expect(error).toEqual(TypeError(`password ${password} is not a string`))
        }

        try {
            email = '-' + Math.random() + '@mail.com'
            password = undefined

            await authenticate(email, password)
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