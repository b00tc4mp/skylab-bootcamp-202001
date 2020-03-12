require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Park, User } } = require('sick-parks-data')
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

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}`
        password = `password-${random()}`


        parkName = `parkName-${random()}`
        size = `l`
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
            const { id } = await User.create({ name, surname, email, password })
            userId = id
            const { id: pid } = await Park.create({ name: parkName, size, level, location, creator: id })
            parkId = pid
        })

        it('should succeed on retrieving the park', async () => {
            await retrievePark({ parkId })
        })
    })
})