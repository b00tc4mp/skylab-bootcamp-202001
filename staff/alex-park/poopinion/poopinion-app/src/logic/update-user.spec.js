import updateUser from './update-user'
const { mongoose, models: { User, Toilet, Comment } } = require('poopinion-data')
const { random, floor } = Math
const jwt = require('jsonwebtoken')
const atob = require('atob')
const bcrypt = require('bcryptjs')
const { NotFoundError, NotAllowedError } = require('../errors')

describe('updateUser', () => {
    let name, surname, email, password, age, gender, dataUpdated, place, latitude, longitude, latitudeDelta, longitudeDelta, coordinates, _id, _toiletId, token, _commentId
    const GENDERS = ['male', 'female', 'non-binary']

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-poopinion', { useNewUrlParser: true, useUnifiedTopology: true })

        await User.deleteMany()
        await Toilet.deleteMany()
        await Comment.deleteMany()
    })

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        age = floor(random() * 100)
        gender = GENDERS[floor(random() * GENDERS.length)]
        dataUpdated = {
            name: `newName-${random()}`,
            surname: `newSurame-${random()}`,
            age: floor(random() * 100),
            password: password
        }
        place = `place-${random()}`
        latitudeDelta = random()
        longitudeDelta = random()
        latitude = random()
        longitude = random()
        coordinates = { latitude, longitude, latitudeDelta, longitudeDelta }
    })

    describe('happy paths', () => {
        it('should successfully update a user info on correct credentials', async () => {
            let _password = await bcrypt.hash(password, 10)
            let user = await User.create({ name, surname, email, password: _password, age, gender });
            _id = user.id
            token = jwt.sign({ sub: _id }, '👌', { expiresIn: '1d' })

            let toilet = await Toilet.create({ publisher: _id, place, coordinates })
            _toiletId = toilet.id

            user = await User.findById(_id)
            toilet = await Toilet.findById(_toiletId).populate('publisher', 'name surname age')

            expect(user).toBeDefined()
            expect(user.name).toMatch(name)
            expect(user.surname).toMatch(surname)
            expect(user.email).toMatch(email)
            expect(user.gender).toMatch(gender)
            expect(user.age).toBe(age)

            expect(toilet).toBeDefined()
            expect(toilet.publisher.name).toMatch(name)
            expect(toilet.publisher.surname).toMatch(surname)
            expect(toilet.publisher.age).toBe(age)

            let update = await updateUser(token, dataUpdated)
            expect(update).toBeUndefined()

            toilet = await Toilet.findById(_toiletId).populate('publisher', 'name surname age')
            user = await User.findById(_id)

            expect(user).toBeDefined()
            expect(user.name).toMatch(dataUpdated.name)
            expect(user.surname).toMatch(dataUpdated.surname)
            expect(user.age).toBe(dataUpdated.age)

            expect(toilet).toBeDefined()
            expect(toilet.publisher.name).toMatch(dataUpdated.name)
            expect(toilet.publisher.surname).toMatch(dataUpdated.surname)
            expect(toilet.publisher.age).toBe(dataUpdated.age)
        })

        it('should successfully allow to change password on a new value', async () => {
            let _password = await bcrypt.hash(password, 10)
            let user = await User.create({ name, surname, email, password: _password, age, gender });
            _id = user.id
            token = jwt.sign({ sub: _id }, '👌', { expiresIn: '1d' })

            let toilet = await Toilet.create({ publisher: _id, place, coordinates })
            _toiletId = toilet.id

            dataUpdated = {
                name: `newName-${random()}`,
                surname: `newSurame-${random()}`,
                age: floor(random() * 100),
                password: password,
                newPassword: `newPassword-${random()}`
            }

            user = await User.findById(_id)
            toilet = await Toilet.findById(_toiletId).populate('publisher', 'name surname age')

            expect(user).toBeDefined()
            expect(user.name).toMatch(name)
            expect(user.surname).toMatch(surname)
            expect(user.email).toMatch(email)
            expect(user.gender).toMatch(gender)
            expect(user.age).toBe(age)
            const valid = await bcrypt.compare(password, user.password)
            expect(valid).toBe(true)

            expect(toilet).toBeDefined()
            expect(toilet.publisher.name).toMatch(name)
            expect(toilet.publisher.surname).toMatch(surname)
            expect(toilet.publisher.age).toBe(age)

            let update = await updateUser(token, dataUpdated)
            expect(update).toBeUndefined()

            toilet = await Toilet.findById(_toiletId).populate('publisher', 'name surname age')
            user = await User.findById(_id)

            expect(user).toBeDefined()
            expect(user.name).toMatch(dataUpdated.name)
            expect(user.surname).toMatch(dataUpdated.surname)
            expect(user.age).toBe(dataUpdated.age)
            const validUpdated = await bcrypt.compare(dataUpdated.newPassword, user.password)
            expect(validUpdated).toBe(true)

            expect(toilet).toBeDefined()
            expect(toilet.publisher.name).toMatch(dataUpdated.name)
            expect(toilet.publisher.surname).toMatch(dataUpdated.surname)
            expect(toilet.publisher.age).toBe(dataUpdated.age)
        })

        it('should fail to update the user if the user is deactivated', async () => {
            await User.findByIdAndUpdate(_id, { $set: { deactivated: true } })

            let _error

            try {
                await updateUser(token, dataUpdated)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(Error)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toEqual(`user with id ${userId} is deactivated`)
        })

        it('should fail to update the user on an invalid token', async () => {
            let _error
            try {
                await updateUser(`${token}-wrong`, dataUpdated)
            } catch (error) {
                _error = error
            }

            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(Error)
            expect(_error.message).toBe('invalid signature')
        })

        it('should fail to update the user on wrong password', async () => {
            let _error
            await User.findByIdAndUpdate(_id, { $set: { deactivated: false } })
            dataUpdated.password = 'wrong-pasword'
            try {
                await updateUser(token, dataUpdated)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(Error)
            expect(_error.message).toEqual('wrong credentials')
        })

        it('should fail to update the user if the user does not exist', async () => {
            await User.deleteMany()

            let _error
            try {
                await updateUser(token, dataUpdated)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotFoundError)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toBe(`user with id ${userId} does not exist`)
        })
    })

    describe('unhappy paths', () => {
        it('should fail on a non string token', () => {
            token = 45438
            expect(() => updateUser(token, dataUpdated)).toThrow(`token ${token} is not a string`)

            token = {}
            expect(() => updateUser(token, dataUpdated)).toThrow(`token ${token} is not a string`)

            token = false
            expect(() => updateUser(token, dataUpdated)).toThrow(`token ${token} is not a string`)

            token = [1, 2, 3]
            expect(() => updateUser(token, dataUpdated)).toThrow(`token ${token} is not a string`)

            token = undefined
            expect(() => updateUser(token, dataUpdated)).toThrow(`token is empty`)
        })

        it('should fail on a non-object data', () => {
            token = 'some token'
            dataUpdated = 45438
            expect(() => updateUser(token, dataUpdated)).toThrow(`data ${dataUpdated} is not a Object`)

            dataUpdated = 'some string'
            expect(() => updateUser(token, dataUpdated)).toThrow(`data ${dataUpdated} is not a Object`)

            dataUpdated = false
            expect(() => updateUser(token, dataUpdated)).toThrow(`data ${dataUpdated} is not a Object`)

            dataUpdated = undefined
            expect(() => updateUser(token, dataUpdated)).toThrow(`data ${dataUpdated} is not a Object`)
        })

        // it('should fail on a non string new password, in case there is one', () => {
        //     token = 'some token'
        //     let dataUpdated = {
        //         newPassword: 45438,
        //         password: 'somepassword'
        //     }

        //     expect(() => updateUser(token, dataUpdated)).toThrow(`newPassword ${dataUpdated.newPassword} is not a string`)

        //     dataUpdated.newPassword = {}
        //     expect(() => updateUser(token, dataUpdated)).toThrow(`newPassword ${dataUpdated.newPassword} is not a string`)

        //     dataUpdated.newPassword = false
        //     expect(() => updateUser(token, dataUpdated)).toThrow(`newPassword ${dataUpdated.newPassword} is not a string`)

        //     dataUpdated.newPassword = [1, 2, 3]
        //     expect(() => updateUser(token, dataUpdated)).toThrow(`newPassword ${dataUpdated.newPassword} is not a string`)

        //     dataUpdated.newPassword = undefined
        //     expect(() => updateUser(token, dataUpdated)).toThrow(`newPassword is empty`)
        // })
    })

    afterAll(async () => {
        await User.deleteMany()
        await Toilet.deleteMany()
        await Comment.deleteMany()
        await mongoose.disconnect()
    })
})