require('dotenv').config()

const logic = require('.')
const { searchParks } = logic

const TEST_MONGODB_URL = process.env.TEST_MONGODB_URL

const { mongoose, models: { Park, Location } } = require('sick-parks-data')
const { expect } = require('chai')
const { random, sqrt, pow } = Math

describe('searchParks', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Park.deleteMany()
    })
    let name, size, level, location, resort
    let name2, size2, level2, location2, resort2
    let first
    let _location

    beforeEach(() => {
        name = `ParkName-${random()}`
        size = `l`
        level = `begginer`
        resort = `Grindelwald`
        location = new Location({ coordinates: [random() * 15 + 1, random() * 15 + 1] })
        verified = true

        _location = [random() * 15 + 1, random() * 15 + 1]

        name2 = `ParkName-${random()}`
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


    })
    describe('when parks exists', () => {
        let park1, park2
        beforeEach(async () => {

            park1 = await Park.create({ name, size, level, resort, location, verified })
            park2 = await Park.create({ name: name2, size: size2, level: level2, resort: resort2, location: location2 })
        })

        it('should order the results by distance', async () => {

            let query = 'begg'

            let results = await searchParks(query, _location)

            expect(results.length).to.be.greaterThan(0)
            expect(results[0].resort).to.equal(first)

        })

        it('should suceed on finding parks', async () => {
            let query = 'begg'
            let results = await searchParks(query, _location)

            results.forEach((result, index) => {
                debugger
                expect([park1.name, park2.name]).to.include(result.name)
                expect([park1.resort, park2.resort]).to.include(result.resort)
                expect([park1.size, park2.size]).to.include(result.size)
                expect([park1.verified, park2.verified]).to.include(result.verified)
                expect([park1.id, park2.id]).to.include(result.id)


            })

            query = 'Grin'

            results = await searchParks(query, _location)

            results.forEach(result => {
                expect(result.name).to.equal(park1.name)
                expect(result.resort).to.equal(park1.resort)
                expect(result.size).to.equal(park1.size)
                expect(result.verified).to.equal(park1.verified)
                expect(result.id).to.equal(park1.id.toString())

            })

            query = 'verified'

            results = await searchParks(query, _location)

            expect(results[0].name).to.equal(park1.name)
            expect(results[0].resort).to.equal(park1.resort)
            expect(results[0].size).to.equal(park1.size)
            expect(results[0].verified).to.equal(park1.verified)
            expect(results[0].id).to.equal(park1.id.toString())


        })

        afterEach(async () => {
            await Park.deleteMany()
        })


    })

    it('should return empty array when no results', async () => {
        let query = 'Random'

        const result = await searchParks(query, _location)
        expect(result).to.be.an.instanceOf(Array)
        expect(result.length).to.equal(0)
    })





    after(() => Park.deleteMany().then(() => mongoose.disconnect()))

})