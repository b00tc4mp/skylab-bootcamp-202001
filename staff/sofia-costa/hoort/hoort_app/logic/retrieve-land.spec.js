require('dotenv').config()
const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const { retrieveLand, updateLandAddVeggie, createLand, authenticateUser, registerUser, retrieveUser, updateLandPlantVeggie } = require('.')
const { random } = Math
const { mongoose, models: { Item, User, Land } } = require('../hoort-data')
const bcrypt = require('bcryptjs')

describe('retrieveLand', () => {

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Promise.resolve[Item.deleteMany({}), User.deleteMany({}), Item.deleteMany({})]

    })

    let colorId, nameVeggie, type, growth, growthDuration, soil, temperature, bestPeriod, lightPreference,
        userId, user, name, username, email, password, token,
        nameLand, location, soiltype, scheme, land, landId

    let veggies = [], lands = []

    beforeEach(async () => {

        type = 'type'
        for (let i = 0; i < 10; i++) {

            colorId = `colorId-${random()}`
            nameVeggie = `name-${random()}`
            type = `type-${random()}`
            subtype = `subtype-${random()}`
            growth = `growth-${random()}@mail.com`
            growthDuration = `growthDuration-${random()}`
            soil = `soil-${random()}`
            temperature = `temperature-${random()}`
            bestPeriod = `bestPeriod-${random()}`
            bestPeriodNum = [1, 2, 3]
            lightPreference = `lightPreference-${random()}`

            let veggie = new Item({ colorId, name: nameVeggie, type, subtype, growth, growthDuration, soil, temperature, bestPeriod, bestPeriodNum, lightPreference })
            veggies.push(veggie)
        }

        await Item.insertMany(veggies)

        name = 'name-' + Math.random()
        username = 'username-' + Math.random()
        email = Math.random() + '@mail.com'
        password = 'password-' + Math.random()

        await registerUser(name, username, email, password)

        token = await authenticateUser(email, password)

        let user = await retrieveUser(token)

        for (let i = 0; i < 10; i++) {
            nameLand = `nameLand-${random()}`
            location = `location-${random()}`
            soiltype = `soiltype-${random()}`
            scheme = [[], [], [], [], []]

            for (let j = 0; j < scheme.length; j++)
                for (let i = 0; i < 3; i++) {
                    scheme[j].push(veggies[i].id)
                }

            await createLand(token, nameLand, location, soiltype, scheme)

            land = await Land.findOne({ name: nameLand })
            lands.push(land)
        }
    })

    //describe('when item is neither planted nor harvested', () => {

    it('should succeed on correct token and land id', async () => {
        for (let i = 0; i < lands.length; i++) {
            let land = await retrieveLand(token, lands[i].id)

            expect(land).toBeDefined()
            expect(land).toBeInstanceOf(Object)
            expect(land.name).toBe(lands[i].name)
            expect(land.location).toBe(lands[i].location)
            expect(land.soiltype).toBe(lands[i].soiltype)
            expect(land.scheme).toStrictEqual(lands[i].toObject().scheme)
        }
    })

    it('should fail on invalid token', async () => {
        try {
            await retrieveLand(`${token}--wrong`, lands[0].id)
        }
        catch (error) {
            expect(error.message).toBe(`invalid signature`)
        }
    })

    it('should fail on invalid id', async () => {
        try {
            await retrieveLand(token, `${lands[0].id}--wrong`)
        }
        catch (error) {
            expect(error).toBeDefined()
        }
    })

    afterEach(async () => {
        await User.deleteMany({})
        await Item.deleteMany({})
        return await Land.deleteMany({})
    })

    afterAll(async () => {
        await Promise.resolve[Item.deleteMany({}), User.deleteMany({}), Item.deleteMany({})]
        return await mongoose.disconnect()
    })
})