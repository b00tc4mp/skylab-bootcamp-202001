require('dotenv').config()
import searchParks from './search-parks'

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

const { mongoose, models: { Park, Location } } = require('../sick-parks-data')

const { random, sqrt, pow } = Math

fdescribe('searchParks', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Park.deleteMany()
    })
    let name, size, level, location, resort
    let name2, size2, level2, location2, resort2
    let first
    let _location

    beforeEach(() => {
        name = `parkName-${random()}`
        size = `l`
        level = `begginer`
        resort = `Grindelwald`
        location = new Location({ coordinates: [random() * 15 + 1, random() * 15 + 1] })
        verified = true

        _location = [random() * 15 + 1, random() * 15 + 1]

        name2 = `parkName-${random()}`
        size2 = `l`
        level2 = `begginer`
        resort2 = `Laax`
        location2 = new Location({ coordinates: [random() * 15 + 1, random() * 15 + 1] })


        function distance(x1, x2, y1, y2) {
            const exponent = pow((x2 - x1), 2) + pow((y2 - y1), 2)
            const result = sqrt(exponent)

            return result
        }

        const parkOneToPointDistance = distance(location.coordinates[0], _location[0], location.coordinates[1], _location[1])
        const parkTwoToPointDistance = distance(location2.coordinates[0], _location[0], location2.coordinates[1], _location[1])

        if (parkOneToPointDistance > parkTwoToPointDistance) {
            first = resort2
        } else {
            first = resort
        }
        // })

    })
    describe('when parks exists', () => {
        let park1, park2
        beforeEach(async () => {

            park1 = await Park.create({ name, size, level, resort, location, verified })
            park2 = await Park.create({ name: name2, size: size2, level: level2, resort: resort2, location: location2 })
        })

        it('should order the results by distance', async () => {

            let query = 'begg'

            let results = await searchParks({ query, location: _location })

            expect(results.length).toBeGreaterThan(0)
            expect(results[0].resort).toBe(first)

        })

        it('should suceed on finding parks', async () => {
            let query = 'begg'
            let results = await searchParks({ query, location: _location })

            results.forEach(result => {
                expect([park1.name, park2.name]).toContain(result.name)
                expect([park1.resort, park2.resort]).toContain(result.resort)
                expect([park1.size, park2.size]).toContain(result.size)
                expect([park1.verified, park2.verified]).toContain(result.verified)
                expect([park1.id, park2.id]).toContain(result.id)


            })

            query = 'Grin'

            results = await searchParks({ query, location: _location })

            results.forEach(result => {
                expect(result.name).toBe(park1.name)
                expect(result.resort).toBe(park1.resort)
                expect(result.size).toBe(park1.size)
                expect(result.verified).toBe(park1.verified)
                expect(result.id).toBe(park1.id.toString())

            })

            query = 'verified'

            results = await searchParks({ query, location: _location })

            expect(results[0].name).toBe(park1.name)
            expect(results[0].resort).toBe(park1.resort)
            expect(results[0].size).toBe(park1.size)
            expect(results[0].verified).toBe(park1.verified)
            expect(results[0].id).toBe(park1.id.toString())


        })

        afterEach(async () => {
            await Park.deleteMany()
        })


    })

    it('should return empty array when no results', async () => {
        let query = 'Random'

        const result = await searchParks({ query, location: _location })
        expect(result).toBeInstanceOf(Array)
        expect(result.length).toBe(0)
    })





    afterAll(() => Park.deleteMany().then(() => mongoose.disconnect()))

})