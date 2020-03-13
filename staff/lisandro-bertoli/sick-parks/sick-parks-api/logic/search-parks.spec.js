require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Park } } = require('sick-parks-data')
const { expect } = require('chai')
const { random, sqrt, pow } = Math
const searchParks = require('./search-parks')

describe('searchParks', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Park.deleteMany()
    })
    let name, size, level, location, resort
    let name2, size2, level2, location2, resort2
    let first
    let _location = [
        1.142578125,
        42.52879629320373
    ]
    beforeEach(() => {
        name = `parkName-${random()}`
        size = `l`
        level = `begginer`
        resort = `Grindelwald`
        location = {
            "type": "Polygon",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -0.32958984375,
                            42.56926437219384
                        ],
                        [
                            -0.2471923828125,
                            42.45588764197166
                        ],
                        [
                            -0.0714111328125,
                            42.50450285299051
                        ],
                        [
                            -0.32958984375,
                            42.56926437219384
                        ]
                    ]
                ]
            }
        }

        name2 = `parkName-${random()}`
        size2 = `l`
        level2 = `begginer`
        resort2 = `Laax`
        location2 = {
            "type": "Polygon",
            "properties": {},
            "geometry": {
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
        }

        function parkCenter(coordinates) {

            let parkX1, parkY1, parkX2, parkY2
            coordinates[0].forEach((point, index) => {
                if (parkX1 === undefined || parkX1 > point[0]) parkX1 = point[0]
                if (parkX2 === undefined || parkX2 < point[0]) parkX2 = point[0]

                if (parkY2 === undefined || parkY2 < point[1]) parkY2 = point[1]
                if (parkY1 === undefined || parkY1 > point[1]) parkY1 = point[1]
            })

            const centerX = parkX1 + ((parkX2 - parkX1) / 2)
            const centerY = parkY1 + ((parkY2 - parkY1) / 2)

            return [centerX, centerY]
        }


        const parkOne = parkCenter(location.geometry.coordinates)
        const parkTwo = parkCenter(location2.geometry.coordinates)

        function distance(x1, x2, y1, y2) {
            const exponent = pow((x2 - x1), 2) + pow((y2 - y1), 2)
            const result = sqrt(exponent)

            return result
        }

        const parkOneToPointDistance = distance(parkOne[0], _location[0], parkOne[1], _location[1])
        const parkTwoToPointDistance = distance(parkTwo[0], _location[0], parkTwo[1], _location[1])

        if (parkOneToPointDistance > parkTwoToPointDistance) {
            first = resort
        } else {
            first = resort2
        }
        // })

    })
    describe('when parks exists', () => {
        let park1, park2
        beforeEach(async () => {
            park1 = await Park.create({ name, size, level, resort, location })
            park2 = await Park.create({ name: name2, size: size2, level: level2, resort: resort2, location: location2 })
        })

        // it('should order the results by distance', async () => {
        //     let q = 'begg'
        //    
        //     let results = await searchParks({ q, _location })

        //     expect(results[0].resort).to.equal(first)

        // })

        it('should suceed on finding parks', async () => {
            let q = 'begg'
            let results = await searchParks({ q, _location })

            results.forEach(result => {
                expect(result.name).to.be.oneOf([park1.name, park2.name])
                expect(result.resort).to.be.oneOf([park1.resort, park2.resort])
                expect(result.size).to.be.oneOf([park1.size, park2.size])
                expect(result.verified).to.be.oneOf([park1.verified, park2.verified])
                expect(result.id).to.be.oneOf([park1.id.toString(), park2.id.toString()])

            })

            q = 'Grin'

            results = await searchParks({ q, _location })

            results.forEach(result => {
                expect(result.name).to.equal(park1.name)
                expect(result.resort).to.equal(park1.resort)
                expect(result.size).to.equal(park1.size)
                expect(result.verified).to.equal(park1.verified)
                expect(result.id).to.equal(park1.id.toString())

            })
        })

        afterEach(async () => {
            await Park.deleteMany()
        })


    })

    it('should return empty array when no results', async () => {
        let q = 'Random'
        debugger
        const result = await searchParks({ q, _location })
        expect(result).to.be.an('array')
        expect(result).to.have.length(0)
    })





    after(() => Park.deleteMany().then(() => mongoose.disconnect()))

})