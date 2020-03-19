const { random, floor } = Math

import retrieveContacts from './retrieve-contacts'

const { mongoose, models: { User, Drug, Guideline } } = require('../data')
const { NotAllowedError, NotFoundError } = require('../errors')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const atob = require('atob')

describe('retrieveContacts', () => {
    
    let name, surname, gender, age, phone, profile, email, password, token, name2, surname2, gender2, age2, phone2, profile2, email2, password2, idUser, idUserToAdd
    
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

        name2 = `name-${random()}`
        surname2 = `surname-${random()}`
        gender2 = `gender-${random()}`
        age2 = random()
        phone2 = `00000-${random()}`
        profile2 = `profile-${random()}`
        email2 = `email--${random()}@mail.com`
        password2 = `password-${random()}`
        
    })


    describe('when user already exists', () => {

        beforeEach( async () => {
            const user = await User.create({ name, surname, gender, age, phone, profile, email, password })
            const user2 = await User.create({ name: name2, surname: surname2, gender: gender2, age: age2, phone: phone2, profile: profile2, email: email2, password: password2 })
                
            token = jwt.sign({ sub: user._id }, 'my cat is a demon', { expiresIn: '1d' })

            _id = user2._id

            user.contacts.push(_id)
            return await user.save()
        })

        it('should succeed on correct and valid and right data', async () => {
            
            const contacts = await retrieveContacts(token)
            
            expect(contacts).toBeInstanceOf(Array)
            expect(contacts[0].id.toString()).toMatch(_id.toString())
            expect(contacts[0].name).toMatch(name2)
            expect(contacts[0].surname).toMatch(surname2)
        })

        it('should fail to retrieve the user on an invalid token', async () => {
            let _error
            try {
                await retrieveContacts(`${token}-wrong`)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotAllowedError)
            expect(_error.message).toBe('invalid signature')
        })
 
    })
    
    

    describe('unhappy paths', () => {
        it('should fail on a non-string token', async () => {
            let _error
            token = 45438
            try {
                await retrieveContacts(token)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${token} is not a string`)
            token = false
            try {
                await retrieveContacts(token)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${token} is not a string`)
            token = undefined
            try {
                await retrieveContacts(token)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token is empty`)
            token = []
            try {
                await retrieveContacts(token)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`token ${token} is not a string`)
        })
    })
    afterAll(() => User.deleteMany().then(() => mongoose.disconnect()))
})