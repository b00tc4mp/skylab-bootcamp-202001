require('dotenv').config()

const { expect } = require('chai')
const { ContentError } = require('sick-parks-errors')
const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Park, User } } = require('sick-parks-data')
const { random } = Math
const createPark = require('./create-park')

describe('createPark', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return Promise.all([User.deleteMany(), Park.deleteMany()])
    })

    let name, size, flow, level, resort, image, description, location

    beforeEach(() => {
        name = `name${random()}`
        size = `size${random()}`
        flow = `flow${random()}`
        level = `level${random()}`
        resort = `resort${random()}`
        image = `image${random()}`
        description = `description${random()}`
        location = {
            "type": "Feature",
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
    let features = {}
    let park = { name, size, flow, level, resort, location, image, description }
    describe('when parameters types are invalid', () => {
        name = 1
        it('should fail on non-string name', () => {
            expect(() => {
                createPark({ park, features })

            }).to.throw(TypeError)
        })
    })

})