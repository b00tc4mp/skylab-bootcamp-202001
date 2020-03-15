import registerUser from './register-user'

const { mongoose, models: { User } } = require('../data')
const { random, floor } = Math

const bcrypt = require('bcryptjs')

describe('registerUser', () => {
    
    let name, surname, gender, age, phone, profile, email, password
    
    const GENDERS = ['male', 'female','non-binary']
    
    
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-pill-o-clock', { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
    })


    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        phone = `${random()}`
        age = floor(random() * 100)
        gender = GENDERS[floor(random() * GENDERS.length)]
        profile = 'pharmacist'
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })


    it('should succeed on correct user data', async () => {
        const result = await registerUser(name, surname, gender, age, phone, profile, email, password)
        
        expect(result).toBeUndefined()
        const user = await User.findOne({ email })
        expect(user).toBeDefined()
        expect(typeof user.id).toBe('string')
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.created).toBeInstanceOf(Date)
        const validPassword = await bcrypt.compare(password, user.password)
        expect(validPassword).toBeTruthy()
    })


    it('should fail to register a user with an email that already exists', async () => {
        let _error
        await registerUser(name, surname, gender, age, phone, profile, email, password)
        try {
            await registerUser(name, surname, gender, age, phone, profile, email, password)
        } catch(error) {
            _error = error
        } expect(_error.message).toBe(`user with email ${email} already exists`)
    })


    describe('trying to register on invalid data', () => {
        it('should fail on a non string name', async () => {
            let _error
            name = 45438
            
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`name ${name} is not a string`)
            
            name = false
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`name ${name} is not a string`)
            
            name = undefined
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`name is empty`)
            
            name = []
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`name ${name} is not a string`)
        })

        it('should fail on a non string surname', async () => {
            let _error
            surname = 45438

            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`surname ${surname} is not a string`)

            surname = false
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`surname ${surname} is not a string`)

            surname = undefined
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`surname is empty`)

            surname = []
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`surname ${surname} is not a string`)
        })
        
        it('should fail on a non string email', async () => {
            let _error
            email = 45438
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)
            
            email = false
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)
           
            email = undefined
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email is empty`)
            
            email = []
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)
        })

        it('should fail on a non valid email address', async () => {
            let _error
            email = 'asjdvsdhjv'
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`${email} is not an e-mail`)
            email = '123@a'
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`${email} is not an e-mail`)
        })

        it('should fail on a non string password', async () => {
            let _error
            password = 45438
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)
            
            password = false
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)
            
            password = undefined
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password is empty`)
            
            password = []
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)
        })

        it('should fail on a non-number age', async () => {
            let _error
            age = 'asdasd'
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`age ${age} is not a number`)
            
            age = false
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`age ${age} is not a number`)
            
            age = undefined
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`age ${age} is not a number`)
            
            age = []
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`age ${age} is not a number`)
        })

        it('should fail on a non-valid gender type', async () => {
            let _error
            gender = 'asdasd'
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`${gender} is not included on the gender list`)
            
            gender = false
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`${gender} is not included on the gender list`)
            
            gender = undefined
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`${gender} is not included on the gender list`)
            
            gender = []
            try {
                await registerUser(name, surname, gender, age, phone, profile, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`${gender} is not included on the gender list`)
        })
    })
    afterAll(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })
})