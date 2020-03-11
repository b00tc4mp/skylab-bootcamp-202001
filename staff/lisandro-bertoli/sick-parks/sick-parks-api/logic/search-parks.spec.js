require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Park } } = require('sick-parks-data')
const { expect } = require('chai')
const { random } = Math
const searchParks = require('./search-parks')

describe.only('searchParks', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Park.deleteMany()
    })
    let name, size, level, location, resort
    let name2, size2, level2, location2, resort2

    beforeEach(() => {
        name = `parkName-${random()}`
        size = `l`
        level = `begginer`
        resort = `Grindelwald`
        location = {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        1.06292724609375,
                        42.413318349422475
                    ],
                    [
                        1.42547607421875,
                        42.31997030030749
                    ],
                    [
                        1.28265380859375,
                        42.45791402988027
                    ],
                    [
                        1.06292724609375,
                        42.413318349422475
                    ]
                ]
            ]
        }

        name2 = `parkName-${random()}`
        size2 = `l`
        level2 = `begginer`
        resort2 = `Laax`
        location2 = {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        1.06292724609375,
                        42.413318349422475
                    ],
                    [
                        1.42547607421875,
                        42.31997030030749
                    ],
                    [
                        1.28265380859375,
                        42.45791402988027
                    ],
                    [
                        1.06292724609375,
                        42.413318349422475
                    ]
                ]
            ]
        }

    })

    describe('when parks exists', () => {
        let park1, park2
        beforeEach(async () => {
            park1 = await Park.create({ name, size, level, resort, location })
            park2 = await Park.create({ name: name2, size: size2, level: level2, resort: resort2, location: location2 })
        })

        it('should suceed on finding parks', async () => {
            let q = 'begg'
            let results = await searchParks({ q })

            results.forEach(result => {
                expect(result.name).to.be.oneOf([park1.name, park2.name])
                expect(result.resort).to.be.oneOf([park1.resort, park2.resort])
                expect(result.size).to.be.oneOf([park1.size, park2.size])
                expect(result.verified).to.be.oneOf([park1.verified, park2.verified])
                expect(result.id).to.be.oneOf([park1.id.toString(), park2.id.toString()])

            })

            q = 'Grin'

            results = await searchParks({ q })

            results.forEach(result => {
                expect(result.name).to.equal(park1.name)
                expect(result.resort).to.equal(park1.resort)
                expect(result.size).to.equal(park1.size)
                expect(result.verified).to.equal(park1.verified)
                expect(result.id).to.equal(park1.id.toString())

            })
        })
    })

    it('should return empty array when no results', async () => {
        let q = 'Random'
        const result = await searchParks({ q })

        expect(result).to.be.an('array')
        expect(result).to.have.length(0)
    })

})