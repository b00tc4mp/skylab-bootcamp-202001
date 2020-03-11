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

    // let name, size, flow, level, resort, image, description, location
    let userName, surname, email, password
    let features = []
    let park = {}
    let featureName, featureSize

    beforeEach(() => {
        featureName = `rail`
        featureSize = `l`

        userName = `name${random()}`
        surname = `surname${random()}`
        email = `${random()}@mail.com`
        password = `password${random()}`

        park.name = `name${random()}`
        park.size = `l`
        park.flow = `flow${random()}`
        park.level = `intermediate`
        park.resort = `resort${random()}`
        park.description = `description${random()}`
        park.location = {

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

    describe.only('when user exists', () => {


        let userId
        beforeEach(async () => {
            const { id } = await User.create({ name: userName, surname, email, password })
            userId = id
            features.push({ name: featureName, size: featureSize })
        })

        it('should create a new park', async () => {
            const _id = await createPark(userId, { park, features })
            const _park = await Park.findById(_id).lean()
            debugger
            expect(_park.name).to.equal(park.name)
            expect(_park.size).to.equal(park.size)
            expect(_park.level).to.equal(park.level)
            expect(_park.flow).to.equal(park.flow)
            expect(_park.resort).to.equal(park.resort)
            expect(_park.location).to.deep.equal(park.location)
            expect(_park.description).to.deep.equal(park.description)
            expect(_park.creator.toString()).to.equal(userId)
        })

        it('should add the park to the user', async () => {
            const _id = await createPark(userId, { park, features })
            const user = await User.findById(userId)

            expect(user.parks).to.include(_id)
        })
    })









    // let features = {}
    // let park = { name, size, flow, level, resort, location, image, description }
    // describe('when parameters types are invalid', () => {
    //     name = 1
    //     it('should fail on non-string name', () => {
    //         expect(() => {
    //             createPark({ park, features })

    //         }).to.throw(TypeError)
    //     })
    // })

})