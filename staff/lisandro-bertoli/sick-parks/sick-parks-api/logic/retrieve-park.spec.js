require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Park, User, Feature } } = require('sick-parks-data')

const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { expect } = require('chai')
const { random } = Math
const retrievePark = require('./retrieve-park')


describe('approvePark', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await [Park.deleteMany(), User.deleteMany()]
    })

    let parkName, size, level, location
    let name, surname, email, password
    let feature = {}

    beforeEach(() => {

        feature.name = "transition"
        feature.size = "xl"
        feature.level = "advanced"
        feature.location = {
            "type": "Point",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    9.221359491348265,
                    46.83083830264651
                ]
            }
        }


        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}`
        password = `password-${random()}`


        parkName = `parkName-${random()}`
        size = `l`
        description = `${random()}`
        resort = `${random()}`
        level = `begginer`
        location = {
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
    })

    describe('when park exists', () => {
        let userId, parkId

        beforeEach(async () => {
            const feat = new Feature(feature)
            const { id } = await User.create({ name, surname, email, password })
            userId = id
            const park = await Park.create({ name: parkName, size, level, resort, description, location, creator: id, features: [feat] })
            parkId = park.id
        })

        it('should succeed on retrieving the park', async () => {
            const result = await retrievePark({ parkId })

            expect(result.name).to.equal(parkName)
            expect(result.id).to.equal(parkId)
            expect(result.resort).to.equal(resort)
            expect(result.description).to.equal(description)

            expect(result.features[0].name).to.equal(feature.name)
            expect(result.features[0].size).to.equal(feature.size)

            expect(result.creator.name).to.equal(name)
            expect(result.creator.id).to.equal(userId)

        })
    })
    describe('when park does not exist', () => {
        let parkId
        beforeEach(async () => {

            const park = await Park.create({ name: parkName, size, level, resort, description, location })
            parkId = park._id.toString()
            await Park.deleteOne({ _id: parkId })
            return
        })

        it('should fail on wrong id', async () => {
            try {
                await retrievePark({ parkId })
                throw new Error('should not reach this point')
            } catch (error) {
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal(`park ${parkId} does not exist`)
            }
        })

        it('should fail on non string id', () => {
            let parkId = 1
            expect(() => {
                retrievePark({ parkId })
            }).to.throw(TypeError, `parkId ${parkId} is not a string`)

            parkId = undefined
            expect(() => {
                retrievePark({ parkId })
            }).to.throw(TypeError, `parkId ${parkId} is not a string`)

            parkId = true
            expect(() => {
                retrievePark({ parkId })
            }).to.throw(TypeError, `parkId ${parkId} is not a string`)
        })
    })

    after(() => Promise.all([Park.deleteMany(), User.deleteMany()]).then(() => mongoose.disconnect()))
})