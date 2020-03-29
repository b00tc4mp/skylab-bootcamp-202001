require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Park, Location } } = require('sick-parks-data')
const { expect } = require('chai')
const { random, sqrt, pow } = Math

const searchParks = require('./search-parks')

describe('searchParks', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Park.deleteMany()
    })
    let name, size, level, location, resort, verified
    let name2, size2, level2, location2, resort2
    let first
    let location

    beforeEach(() => {
        name = `ParkName-${random()}`
        size = `l`
        level = `begginer`
        resort = `Grindelwald`
        location = new Location({ coordinates: [random() * 15 + 1, random() * 15 + 1] })
        verified = true

        location = [random() * 15 + 1, random() * 15 + 1]

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

        const parkOneToPointDistance = distance(location.coordinates[0], location[0], location.coordinates[1], location[1])
        const parkTwoToPointDistance = distance(location2.coordinates[0], location[0], location2.coordinates[1], location[1])

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

            let q = 'begg'

            let results = await searchParks({ q, location })

            expect(results.length).to.be.greaterThan(0)
            expect(results[0].resort).to.equal(first)

        })

        it('should suceed on finding parks', async () => {
            let q = 'begg'
            let results = await searchParks({ q, location })

            results.forEach(result => {
                expect(result.name).to.be.oneOf([park1.name, park2.name])
                expect(result.resort).to.be.oneOf([park1.resort, park2.resort])
                expect(result.size).to.be.oneOf([park1.size, park2.size])
                expect(result.verified).to.be.oneOf([park1.verified, park2.verified])
                expect(result.id).to.be.oneOf([park1.id.toString(), park2.id.toString()])

            })

            q = 'Grin'

            results = await searchParks({ q, location })

            results.forEach(result => {
                expect(result.name).to.equal(park1.name)
                expect(result.resort).to.equal(park1.resort)
                expect(result.size).to.equal(park1.size)
                expect(result.verified).to.equal(park1.verified)
                expect(result.id).to.equal(park1.id.toString())

            })
        })

        it('should succeed on retrieving all parks on empty query', async () => {
            let q = ''
            let results = await searchParks({ q, location })

            results.forEach(result => {
                expect(result.name).to.be.oneOf([park1.name, park2.name])
                expect(result.resort).to.be.oneOf([park1.resort, park2.resort])
                expect(result.size).to.be.oneOf([park1.size, park2.size])
                expect(result.verified).to.be.oneOf([park1.verified, park2.verified])
                expect(result.id).to.be.oneOf([park1.id.toString(), park2.id.toString()])

            })
        })

        it('on "latest" query, should order the results by creation date', async () => {
            let q = 'latest'
            let results = await searchParks({ q, location })

            expect(results[0].name).to.equal(park2.name)
            expect(results[1].name).to.equal(park1.name)
        })

        it('on "verified" query, should return only verified parks', async () => {
            let q = 'verified'
            let results = await searchParks({ q, location })

            expect(results[0].name).to.equal(park1.name)
            expect(results[1]).to.be.undefined
        })

        afterEach(async () => {
            await Park.deleteMany()
        })


    })

    it('should return empty array when no results', async () => {
        let q = 'Random'

        const result = await searchParks({ q, location })
        expect(result).to.be.an('array')
        expect(result).to.have.length(0)
    })





    after(() => Park.deleteMany().then(() => mongoose.disconnect()))

})