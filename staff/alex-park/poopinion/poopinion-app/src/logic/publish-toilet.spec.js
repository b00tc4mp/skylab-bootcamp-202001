import publishToilet from './publish-toilet'
const { mongoose, models: { User, Toilet } } = require('poopinion-data')
const { random, floor } = Math
const bcrypt = require('bcryptjs')
const atob = require('atob')
const jwt = require('jsonwebtoken')
import { NotAllowedError, NotFoundError } from '../errors'

describe('publishToilet', () => {
    let name, surname, email, password, age, gender, place, latitude, longitude, latitudeDelta, longitudeDelta, coordinates, image
    const GENDERS = ['male', 'female', 'non-binary']

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-poopinion', { useNewUrlParser: true, useUnifiedTopology: true })

        await User.deleteMany()
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
        image = `image-${random()}`
    })

    describe('happy paths', () => {
        let _id, _token

        beforeEach(async () => {
            const _password = await bcrypt.hash(password, 10)
            let user = await User.create({ name, surname, email, password: _password, age, gender })
            _id = user.id
            _token = await jwt.sign({ sub: _id }, '👌', { expiresIn: '1d' })
        })

        it('should succeed on a correct publish', async () => {
            const result = await publishToilet(_token, place, null, coordinates)
            expect(result).toBeUndefined()

            const toilet = await Toilet.findOne({ publisher: _id })
            expect(toilet).toBeDefined()
            expect(toilet.place).toBe(place)
            expect(toilet.publisher.toString()).toBe(_id)
            expect(toilet.geolocation).toBeInstanceOf(Object)
            expect(toilet.geolocation.latitude).toBe(latitude)
            expect(toilet.geolocation.longitude).toBe(longitude)
            expect(toilet.geolocation.latitudeDelta).toBe(latitudeDelta)
            expect(toilet.geolocation.longitudeDelta).toBe(longitudeDelta)
        })

        it('should fail to retrieve the user on an invalid token', async () => {
            let _error
            try {
                await publishToilet(`${_token}-wrong`, place, image, coordinates)
            } catch (error) {
                _error = error
            }

            expect(_error).toBeDefined()
            expect(_error.message).toBe('invalid signature')
            expect(_error).toBeInstanceOf(Error)
        })

        it('should fail to auth if the user is deactivated', async () => {
            await User.findByIdAndUpdate(_id, { $set: { deactivated: true } })
            let _error

            try {
                await publishToilet(_token, place, image, coordinates)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotAllowedError)
            const userId = JSON.parse(atob(_token.split('.')[1])).sub
            expect(_error.message).toEqual(`user with id ${userId} is deactivated`)
        })

        it('should fail to retrieve a non-existant user', async () => {
            await User.deleteMany()
            let _error
            try {
                await publishToilet(_token, place, image, coordinates)
            } catch (error) {
                _error = error
            }
            expect(_error).toBeDefined()
            expect(_error).toBeInstanceOf(NotFoundError)
            const userId = JSON.parse(atob(_token.split('.')[1])).sub
            expect(_error.message).toBe(`user with id ${userId} does not exist`)
        })
    })

    describe('unhappy paths', () => {
        it('should fail on a non string token', () => {
            _token = 45438
            expect(() => publishToilet(_token, place, image, coordinates)).toThrow(`token ${_token} is not a string`)
           
            _token = {}
            expect(() => publishToilet(_token, place, image, coordinates)).toThrow(`token ${_token} is not a string`)
            
            _token = false
            expect(() => publishToilet(_token, place, image, coordinates)).toThrow(`token ${_token} is not a string`)
            
            _token = [1,2,3]
            expect(() => publishToilet(_token, place, image, coordinates)).toThrow(`token ${_token} is not a string`)
      
            _token = undefined
            expect(() => publishToilet(_token, place, image, coordinates)).toThrow(`token is empty`)
        })

        it('should fail on a non object coordinates', () => {
            _token = 'sometoken'
            place = 'someplace'
            coordinates = 45438
            expect(() => publishToilet(_token, place, image, coordinates)).toThrow(`coordinates ${coordinates} is not a Object`)
           
            coordinates = 'sasasas'
            expect(() => publishToilet(_token, place, image, coordinates)).toThrow(`coordinates ${coordinates} is not a Object`)
            
            coordinates = false
            expect(() => publishToilet(_token, place, image, coordinates)).toThrow(`coordinates ${coordinates} is not a Object`)
            
            coordinates = undefined
            expect(() => publishToilet(_token, place, image, coordinates)).toThrow(`coordinates ${coordinates} is not a Object`)
        })
    })

    afterAll(async () => {
        await User.deleteMany()
        await Toilet.deleteMany()
        await mongoose.disconnect()
    })
})