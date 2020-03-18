import toggleFavToilet from './toggle-fav-toilet'
const { mongoose, models: { User, Toilet } } = require('poopinion-data')
const { random, floor } = Math
const jwt = require('jsonwebtoken')
const atob = require('atob')
const { NotFoundError, NotAllowedError } = require('../errors')

describe('toggleFavToilet', () => {
    let name, surname, email, password, age, gender, place, latitude, longitude, latitudeDelta, longitudeDelta, coordinates, _id, _toiletId, token
    const GENDERS = ['male', 'female', 'non-binary']

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-poopinion', { useNewUrlParser: true, useUnifiedTopology: true })

        await User.deleteMany()
        await Toilet.deleteMany()
    })

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        age = floor(random() * 100)
        gender = GENDERS[floor(random() * GENDERS.length)]
        place = `place-${random()}`
        latitudeDelta = random()
        longitudeDelta = random()
        latitude = random()
        longitude = random()
        coordinates = { latitude, longitude, latitudeDelta, longitudeDelta }
    })

    describe('happy paths', () => {

        it('should successfully toggle/untoggle the toilet to favorites', async () => {
            let user = await User.create({ name, surname, email, password, age, gender });
            _id = user.id
            token = jwt.sign({ sub: _id }, '👌', { expiresIn: '1d' })
            let toilet = await Toilet.create({ publisher: _id, place, coordinates })
            _toiletId = toilet.id

            const toggle = await toggleFavToilet(token, _toiletId)
            expect(toggle).toBeUndefined()

            toilet = await Toilet.findById(_toiletId)
            user = await User.findById(_id).lean()

            expect(toilet.isFavedBy).toBeInstanceOf(Array)
            expect(toilet.isFavedBy.length).toBe(1)
            expect(toilet.isFavedBy[0].toString()).toMatch(_id)

            expect(user.favToilets).toBeInstanceOf(Array)
            expect(user.favToilets.length).toBe(1)
            expect(user.favToilets[0].toString()).toMatch(_toiletId)

            const untoggle = await toggleFavToilet(token, _toiletId)
            expect(untoggle).toBeUndefined()

            toilet = await Toilet.findById(_toiletId)
            user = await User.findById(_id).lean()

            expect(toilet.isFavedBy).toBeInstanceOf(Array)
            expect(toilet.isFavedBy.length).toBe(0)

            expect(user.favToilets).toBeInstanceOf(Array)
            expect(user.favToilets.length).toBe(0)
        })

        it('should fail to toggle/untoggle if the user is deactivated', async () => {
            await User.findByIdAndUpdate(_id, { $set: { deactivated: true } })

            let _error

            try {
                await toggleFavToilet(token, _toiletId)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(Error)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toEqual(`user with id ${userId} is deactivated`)
        })

        it('should fail to toggle favs on an invalid token', async () => {
            let _error
            try {
                await toggleFavToilet(`${token}-wrong`, _toiletId)
            } catch (error) {
                _error = error
            }

            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotAllowedError)
            expect(_error.message).toBe('invalid signature')
        })

        it('should fail to toggle favs if the user does not exist', async () => {
            await User.deleteMany()

            let _error
            try {
                await toggleFavToilet(token, _toiletId)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotFoundError)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toBe(`user with id ${userId} does not exist`)
        })

        it('should fail to toggle favs if the toilet does not exist', async () => {
            let user = await User.create({ name, surname, email, password, age, gender });
            _id = user.id
            token = jwt.sign({ sub: _id }, '👌', { expiresIn: '1d' })
            await Toilet.deleteMany()

            let _error
            try {
                await toggleFavToilet(token, _toiletId)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotFoundError)
            expect(_error.message).toBe(`toilet with id ${_toiletId} does not exist`)
        })
    })

    describe('unhappy paths', () => {
        it('should fail on a non string token', () => {
            token = 45438
            expect(() => toggleFavToilet(token, _toiletId)).toThrow(`token ${token} is not a string`)

            token = {}
            expect(() => toggleFavToilet(token, _toiletId)).toThrow(`token ${token} is not a string`)

            token = false
            expect(() => toggleFavToilet(token, _toiletId)).toThrow(`token ${token} is not a string`)

            token = [1, 2, 3]
            expect(() => toggleFavToilet(token, _toiletId)).toThrow(`token ${token} is not a string`)

            token = undefined
            expect(() => toggleFavToilet(token, _toiletId)).toThrow(`token is empty`)
        })

        it('should fail on a non-string toilet ID', () => {
            token = 'some token'
            _toiletId = 45438
            expect(() => toggleFavToilet(token, _toiletId)).toThrow(`toiletId ${_toiletId} is not a string`)

            _toiletId = {}
            expect(() => toggleFavToilet(token, _toiletId)).toThrow(`toiletId ${_toiletId} is not a string`)

            _toiletId = false
            expect(() => toggleFavToilet(token, _toiletId)).toThrow(`toiletId ${_toiletId} is not a string`)

            _toiletId = [1, 2, 3]
            expect(() => toggleFavToilet(token, _toiletId)).toThrow(`toiletId ${_toiletId} is not a string`)

            _toiletId = undefined
            expect(() => toggleFavToilet(token, _toiletId)).toThrow(`toiletId is empty`)
        })
    })

    afterAll(async () => {
        await User.deleteMany()
        await Toilet.deleteMany()
        await mongoose.disconnect()
    })
})