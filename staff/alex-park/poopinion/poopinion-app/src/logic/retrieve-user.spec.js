const { random, floor } = Math
import retrieveUser from './retrieve-user'
const { mongoose, models: { User } } = require('../data')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const atob = require('atob')
const { NotAllowedError, NotFoundError } = require('../errors')

describe('retrieveUser', () => {
    beforeAll(() =>
        mongoose.connect('mongodb://localhost:27017/test-poopinion', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password, age, gender, token
    const GENDERS = ['male', 'female', 'non-binary']

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        age = floor(random() * 100)
        gender = GENDERS[floor(random() * GENDERS.length)]
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)

            await User.create({ name, surname, email, password: _password, age, gender })
                .then(user => {
                    _id = user.id
                    return user.id
                })
                .then(id => {
                    token = jwt.sign({ sub: id }, '👌', { expiresIn: '1d' })
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
    })

    describe('when the user does not exist', () => {
        beforeEach(() =>
            User.deleteMany().then(() => { })
        )

        it('should fail to retrieve a non-existant user', async () => {
            let _error
            try {
                await retrieveUser(token)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotFoundError)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toBe(`user with id ${userId} does not exist`)
        })
    })

    describe('when the user is deactivated', () => {
        let _id
        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)
            await User.create({ name, surname, email, password: _password, age, gender })
                .then(user => _id = user.id)
                .then(() => User.findByIdAndUpdate(_id, { $set: { deactivated: true } }))
                .then(() => {
                    token = jwt.sign({ sub: _id }, '👌', { expiresIn: '1d' })
                    return token
                })
                .then(() => { })
        })

        it('should fail to auth if the user is deactivated', async () => {
            let _error

            try {
                await retrieveUser(token)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotFoundError)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toEqual(`user with id ${userId} is deactivated`)
        })
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