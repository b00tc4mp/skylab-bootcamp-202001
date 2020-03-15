const { random, floor } = Math

import retrieveUser from './retrieve-user'

const { mongoose, models: { User } } = require('../data')
const { NotAllowedError, NotFoundError } = require('../errors')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const atob = require('atob')

describe('retrieveUser', () => {
    
    let name, surname, gender, age, phone, profile, email, password, token
    
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


    describe('when user already exists', () => {
        let _id

        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)
            const result = await User.create({name, surname, gender, age, phone, profile, email, password: _password})
                .then(user => {
                    _id = user.id
                    return user.id
                })
                .then(id => {
                    token = jwt.sign({ sub: id }, 'my cat is a demon', { expiresIn: '1d' })
                    
                    return token
                })
                .then(() => { })
        })

        it('should succeed on correct and valid and right data', async () => {
            
            const user = await retrieveUser(token)

            expect(user).toBeDefined()
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.email).toBe(email)
            expect(user.age).toBe(age)
            expect(user.gender).toBe(gender)
            expect(user.password).toBeUndefined()
        })

        it('should fail to retrieve the user on an invalid token', async () => {
            let _error
            try {
                await retrieveUser(`${token}-wrong`)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotAllowedError)
            expect(_error.message).toBe('invalid signature')
        })
        // it('should fail to retrieve a non-existant user', async () => {
        //     await User.deleteMany().then(() => { })
        //     let _error
            
        //     try {
        //         await retrieveUser(token)
        //     } catch (error) {
        //         _error = error
        //     }
        //     console.log(_error)
        //     expect(_error).toBeDefined()
        //     expect(_error).toBeInstanceOf(NotFoundError)

        //     const userId = JSON.parse(atob(token.split('.')[1])).sub
        //     expect(_error.message).toBe(`user with id ${userId} does not exist`)
        // })
    })
    
    

    describe('unhappy paths', () => {
        it('should fail on a non-string token', async () => {
            let _error
            token = 45438
            try {
                await retrieveUser(token)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${token} is not a string`)
            token = false
            try {
                await retrieveUser(token)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${token} is not a string`)
            token = undefined
            try {
                await retrieveUser(token)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token is empty`)
            token = []
            try {
                await retrieveUser(token)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${token} is not a string`)
        })
    })
    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
})