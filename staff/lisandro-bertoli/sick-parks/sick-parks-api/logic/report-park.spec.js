require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { mongoose, models: { User, Park, Location } } = require('sick-parks-data')
const { expect } = require('chai')
const { random, floor } = Math
const reportPark = require('./report-park')

describe('reportPark', () => {
    before(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await [User.deleteMany(), Park.deleteMany()]
    })

    let name, surname, email, password
    let parkName, size, level, location
    let body
    let validOptions = ['unreal', 'duplicate']

    beforeEach(() => {
        const problem = validOptions[floor(random() * 2)]
        body = { problem }


        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}`
        password = `password-${random()}`

        parkName = `parkName-${random()}`
        size = `l`
        level = `begginer`
        location = new Location({ coordinates: [random() * 15 + 1, random() * 15 + 1] })
    })

    describe('when user and park ids are valid and exist', () => {
        let parkId, userId

        beforeEach(async () => {
            const { id } = await User.create({ name, surname, email, password })
            userId = id

            const { id: _id } = await Park.create({ name: parkName, size, level, location })
            parkId = _id
        })

        it('should succeed on reporting the problem', async () => {
            const underReview = await reportPark({ pid: parkId }, body, { sub: userId })

            const park = await Park.findOne({ _id: parkId }).lean()

            expect(park.reports[0].user.toString()).to.equal(userId)
            expect(park.reports[0].problem).to.equal(body.problem)
            expect(typeof underReview).to.equal('boolean')

        })

        it('should add the parkId to the contributions of the user', async () => {
            await reportPark({ pid: parkId }, body, { sub: userId })

            const user = await User.findOne({ _id: userId }).lean()

            expect(user.contributions[0].toString()).to.equal(parkId)
        })

        describe('when reports duplicate or unreal reach 5', () => {
            beforeEach(async () => {
                const park = await Park.create({ name: parkName, size, level, location })
                parkId = park._id.toString()

                for (let i = 1; i < 5; i++) {
                    const { id } = await User.create({ name, surname, email, password })

                    const report = {
                        user: id,
                        problem: 'duplicate'
                    }
                    const report2 = {
                        user: id,
                        problem: 'unreal'
                    }
                    park.reports.push(report)
                    park.reports.push(report2)
                    await park.save()
                }
            })

            it('should set the park under review', async () => {

                const underReview = await reportPark({ pid: parkId }, body, { sub: userId })
                const _park = await Park.findById(parkId).lean()

                expect(_park.underReview).to.equal(true)
                expect(_park.underReview).to.equal(underReview)
            })
        })

        describe('when user already reported the problem', () => {
            it('should fail and throw', async () => {
                await reportPark({ pid: parkId }, body, { sub: userId })
                try {

                    await reportPark({ pid: parkId }, body, { sub: userId })
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).to.be.instanceOf(NotAllowedError)
                    expect(error.message).to.equal(`user ${userId} alredy filed this report`)
                }

            })
        })

        //TODO more unhappy paths

    })

    after(() => Promise.all([User.deleteMany(), Park.deleteMany()]).then(() => mongoose.disconnect()))
})

