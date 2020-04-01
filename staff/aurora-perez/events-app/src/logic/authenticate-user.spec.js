const { mongoose, models: { User } }= require('events-data')
const { random } = Math
const {authenticateUser} = require('.')

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL


describe('authenticateUser', () => {
    beforeAll (async() =>{
        return await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    })

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let token

        beforeEach( async() =>{
            await User.create({ name, surname, email, password })

            //_id = user.id
        })

        it('should succeed on correct and valid and right credentials', async() =>{
            const token = await authenticateUser(email, password)
              
            expect(typeof token).toBe('string')
            const [header, payload, signature] = token.split('.')

            expect(header.length).toBeGreaterThan(0)
            expect(payload.length).toBeGreaterThan(0)
            expect(signature.length).toBeGreaterThan(0)
                
        })

        it('should fail with incorrect password', async () => {
            password = `${password}--wrong`

            try{
                await authenticateUser(email, password)

            }catch(error) {
                //expect(error).toThrow()
                expect(error.message).toBe('wrong credentials')
                expect(error).toBeInstanceOf(Error)
            }
        })

         it('should fail with incorrect email', async () => {
            email = `wrong--${email}`

            try{
                const error = await authenticateUser(email, password)
                
            } catch (error) {
                expect(error.message).toBe('wrong credentials')
                expect(error).toBeInstanceOf(Error)
            }

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

    afterAll(() => mongoose.disconnect())
})