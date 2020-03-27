require('dotenv').config()
const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const { searchSuggested, createItem } = require('.')
const { random } = Math
const { mongoose, models: { Item } } = require('../hoort-data')

describe('searchSuggested', () => {

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Promise.resolve(Item.deleteMany({}))
    })

    let colorId, name, type, growth, growthDuration, soil, temperature, bestPeriod, lightPreference, query, index
    let items = []

    beforeEach(async () => {

        type = 'type'
        for (let i = 0; i < 10; i++) {

            colorId = `colorId-${random()}`
            name = `name-${random()}`
            type = `type`
            subtype = `subtype-${random()}`
            growth = `growth-${random()}@mail.com`
            growthDuration = `growthDuration-${random()}`
            soil = `soil-${random()}`
            temperature = `temperature-${random()}`
            bestPeriod = `bestPeriod-${random()}`
            bestPeriodNum = (new Date()).getMonth()
            lightPreference = `lightPreference-${random()}`

            await createItem(colorId, name, type, subtype, growth, growthDuration, soil, temperature, bestPeriod, bestPeriodNum, lightPreference)

            let result = await Item.findOne({ name: name })

            items.push(result)
        }

        index = Math.floor(Math.random() * 10)
    })

    afterEach(() => {
        items = []
    })

    it('should succeed on correct data', async () => {

        let _results = await searchSuggested()

        expect(_results.length).toBe(10)

        for (let i = 0; i < 10; i++) {
            expect(_results[i].name).toBe(items[i].name)
            expect(_results[i].colorId).toBe(items[i].colorId)
            expect(_results[i].type).toBe(items[i].type)
            expect(_results[i].growth).toBe(items[i].growth)
            expect(_results[i].growthDuration).toBe(items[i].growthDuration)
            expect(_results[i].soil).toBe(items[i].soil)
            expect(_results[i].temperature).toBe(items[i].temperature)
            expect(_results[i].bestPeriod).toBe(items[i].bestPeriod)
            expect(_results[i].lightPreference).toBe(items[i].lightPreference)
        }
    })

    afterAll(async () => {
        await Promise.resolve(Item.deleteMany({}))
        return await mongoose.disconnect()
    })
})