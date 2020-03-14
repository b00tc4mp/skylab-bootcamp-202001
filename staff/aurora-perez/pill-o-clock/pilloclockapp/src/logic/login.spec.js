const { random, floor } = Math
const { mongoose, models: { User } } = require('../data')

import login  from './login'

const bcrypt = require('bcryptjs')
const atob = require('atob')

describe('login', () => {
 let name, password, gender, age, phone, profile, email, password
    
    const GENDERS = ['male', 'female','non-binary']
    
    
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-pill-o-clock', { useNewUrlParser: true, useUnifiedTopology: true })
        await User.deleteMany()
    })


    beforeEach(() => {
        name = `name-${random()}`
        password = `password-${random()}`
        phone = `${random()}`
        age = floor(random() * 100)
        gender = GENDERS[floor(random() * GENDERS.length)]
        profile = 'pharmacist'
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)

            await User.create({ name, password, gender, age, phone, profile, email, password: _password})
                .then(user => _id = user.id)
        })

        it('should succeed on correct and valid and right credentials', () =>
            login(email, password)
                .then(token => {

                    expect(typeof token).toBe('string')
                    expect(token.length).toBeGreaterThan(0)

                    const { sub } = JSON.parse(atob(token.split('.')[1]))

                    expect(sub).toBe(_id)
                })
        )

        it('should fail on incorrect email', () =>
            login(`wrong-${email}`, password)
                .then(()=> {throw new Error ('you shoul not be at this point')})
                .catch(error => expect(error.message).toBe('wrong credentials'))
        )

        it('should fail on incorrect password', () =>
            login(email, `wrong-${password}`)
                .then(()=> {throw new Error ('you shoul not be at this point')})
                .catch(error => expect(error.message).toBe('wrong credentials'))
        )
    })

    describe('trying to register on invalid data', () => {
        it('should fail on a non valid email', async () => {
            let _error
            email = 45438
            
            try {
                await login( email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)
            
            email = false
            try {
                await login( email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)
            
            email = undefined
            try {
                await login( email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)
            
            email = []
            try {
                await login( email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`email ${email} is not a string`)
        })

        it('should fail on a non string password', async () => {
            let _error
            password = 45438

            try {
                await login( email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)
            
            password = false
            try {
                await login( email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)
            
            password = undefined
            try {
                await login( email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)
            
            password = []
            try {
                await login( email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)
        })
    })

    // TODO more happies and unhappies

    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
})