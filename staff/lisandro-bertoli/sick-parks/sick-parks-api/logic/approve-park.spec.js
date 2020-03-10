require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Park, User } } = require('sick-parks-data')
const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { expect } = require('chai')
const { random } = Math
const approvePark = require('./approve-park')


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

    describe('when user and park exist', () => {
        let userId, parkId

        beforeEach(async () => {
            const { id } = await User.create({ name, surname, email, password })
            userId = id

        })
        describe('when park has less than 4 approvals', () => {
            beforeEach(async () => {
                const { id: _id } = await Park.create({ name: parkName, size, level, location })
                parkId = _id
            })


            it('should succeed on incrementing approvals by 1', async () => {
                await approvePark({ userId, parkId })

                const park = await Park.findById(parkId)

                expect(park.approvals.length).to.equal(1)
                expect(park.approvals[0].toString()).to.equal(userId)

            })

            it('should fail when user already gave approval', async () => {
                await approvePark({ userId, parkId })

                try {
                    await approvePark({ userId, parkId })
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(NotAllowedError)
                    expect(error.message).to.equal(`user with id ${userId} already approved`)

                }
            })
        })


        describe('when park already has 4 approvals', () => {
            beforeEach(async () => {
                const park = await Park.create({ name: parkName, size, level, location })
                parkId = park._id.toString()

                for (let i = 1; i < 5; i++) {
                    const { id } = await User.create({ name, surname, email, password })
                    park.approvals.push(id)
                    await park.save()
                }



            })

            it('should succeed on verifying the park', async () => {
                await approvePark({ userId, parkId })

                const _park = await Park.findById(parkId).lean()



                expect(_park.verified).to.be.true
            })
        })


    })

    describe('when user does not exist', () => {
        let parkId
        let userId = 'asdfasdfasfd'
        beforeEach(async () => {
            const { id: _id } = await Park.create({ name: parkName, size, level, location })
            parkId = _id
        })

        it('should fail and throw', async () => {
            try {
                await approvePark({ userId, parkId })
                throw new Error('should not reach this point')
            } catch (error) {

                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.be.equal(`user with id ${userId} does not exist`)
            }
        })
    })

    describe('when park does not exist', () => {
        let userId
        let parkId = 'asdfasdfasfd'
        beforeEach(async () => {
            const { id: _id } = await User.create({ name, surname, email, password })
            userId = _id
        })

        it('should fail and throw', async () => {
            try {
                await approvePark({ userId, parkId })
                throw new Error('should not reach this point')
            } catch (error) {

                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.be.equal(`park with id ${parkId} does not exist`)
            }
        })
    })

    after(() => Promise.all([User.deleteMany(), Park.deleteMany()]).then(() => mongoose.disconnect()))

})