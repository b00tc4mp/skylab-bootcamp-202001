require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Park, User } } = require('sick-parks-data')
const { expect } = require('chai')
const { random } = Math
const retrievePublishedParks = require('./retrieve-published-parks')


describe('retrievePublishedParks', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await [Park.deleteMany(), User.deleteMany()]
    })

    let parkName, size, level, location
    let name, surname, email, password

    beforeEach(() => {
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
            // "type": "Polygon",
            // "properties": {},
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

    describe('when user and park exist', () => {
        let userId, parkId

        beforeEach(async () => {

            const { id } = await User.create({ name, surname, email, password })
            userId = id
            const park = await Park.create({ name: parkName, size, level, resort, description, location, creator: id })
            parkId = park.id
        })

        it('should succeed on correct credentials', async () => {
            const result = await retrievePublishedParks({ id: userId })

            expect(result[0].name).to.equal(parkName)
            expect(result[0].id).to.equal(parkId)
            expect(result[0].resort).to.equal(resort)
            expect(result[0].size).to.equal(size)
            expect(result[0].verified).to.exist

        })
    })
    describe('when user has no parks', () => {
        let userId
        beforeEach(async () => {
            const { id } = await User.create({ name, surname, email, password })
            userId = id

        })

        it('should fail returning empty array', async () => {

            const result = await retrievePublishedParks({ id: userId })

            expect(result).to.be.instanceOf(Array)
            expect(result.length).to.equal(0)


        })

    })

    it('should fail on non string id', () => {
        let userId = 1
        expect(() => {
            retrievePublishedParks({ id: userId })
        }).to.throw(TypeError, `userId ${userId} is not a string`)

        userId = undefined
        expect(() => {
            retrievePublishedParks({ id: userId })
        }).to.throw(TypeError, `userId ${userId} is not a string`)

        userId = true
        expect(() => {
            retrievePublishedParks({ id: userId })
        }).to.throw(TypeError, `userId ${userId} is not a string`)
    })

    after(() => Promise.all([Park.deleteMany(), User.deleteMany()]).then(() => mongoose.disconnect()))
})