import retrieveFavToilets from './retrieve-fav-toilets'
const { mongoose, models: { User, Toilet } } = require('poopinion-data')
const { random, floor } = Math
const jwt = require('jsonwebtoken')
const atob = require('atob')
const { NotFoundError, NotAllowedError } = require('../errors')

describe('retrieveFavToilets', () => {
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
        it('should successfully retrieve the favorited toilets', async () => {
            let user = await User.create({ name, surname, email, password, age, gender });
            _id = user.id
            token = jwt.sign({ sub: _id }, '👌', { expiresIn: '1d' })

            let toilet = await Toilet.create({ publisher: _id, place, coordinates })
            _toiletId = toilet.id

            await User.findByIdAndUpdate(_id, { $push: { favToilets: _toiletId } })
            await Toilet.findByIdAndUpdate(_toiletId, { $push: { isFavedBy: _id } })

            const favToilets = await retrieveFavToilets(token)
            expect(favToilets).toBeDefined()
            expect(favToilets).toBeInstanceOf(Array)
            expect(favToilets[0]).toBeInstanceOf(Object)
            expect(favToilets[0].publisher.toString()).toMatch(_id)
            expect(favToilets[0].isFavedBy[0].toString()).toMatch(_id)
            expect(favToilets[0]._id.toString()).toMatch(_toiletId)

            user = await User.findById(_id).lean()

            expect(user.favToilets).toBeDefined()
            expect(user.favToilets).toBeInstanceOf(Array)
            expect(user.favToilets[0].toString()).toMatch(_toiletId)
        })

        it('should fail to retrieve any toilets if the user is deactivated', async () => {
            await User.findByIdAndUpdate(_id, { $set: { deactivated: true } })

            let _error

            try {
                await retrieveFavToilets(token)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(Error)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toEqual(`user with id ${userId} is deactivated`)
        })

        it('should fail to retrieve any fav toilets on an invalid token', async () => {
            let _error
            try {
                await retrieveFavToilets(`${token}-wrong`)
            } catch (error) {
                _error = error
            }

            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotAllowedError)
            expect(_error.message).toBe('invalid signature')
        })

        it('should fail to retrieve any favorite toilets if the user does not exist', async () => {
            await User.deleteMany()

            let _error
            try {
                await retrieveFavToilets(token)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotFoundError)
            const userId = JSON.parse(atob(token.split('.')[1])).sub
            expect(_error.message).toBe(`user with id ${userId} does not exist`)
        })

        describe('unhappy paths', () => {
            it('should fail on a non string token', () => {
                token = 45438
                expect(() => retrieveFavToilets(token)).toThrow(`token ${token} is not a string`)

                token = {}
                expect(() => retrieveFavToilets(token)).toThrow(`token ${token} is not a string`)

                token = false
                expect(() => retrieveFavToilets(token)).toThrow(`token ${token} is not a string`)

                token = [1, 2, 3]
                expect(() => retrieveFavToilets(token)).toThrow(`token ${token} is not a string`)

                token = undefined
                expect(() => retrieveFavToilets(token)).toThrow(`token is empty`)
            })
        })
    })

    afterAll(async () => {
        await User.deleteMany()
        await Toilet.deleteMany()
        await mongoose.disconnect()
    })
})