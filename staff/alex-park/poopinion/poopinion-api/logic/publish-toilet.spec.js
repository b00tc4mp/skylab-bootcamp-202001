require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random, floor } = Math
const publishToilet = require('./publish-toilet')
const { mongoose, models: { User, Toilet } } = require('poopinion-data')

describe('publishToilet', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Toilet.deleteMany()]))
            .then(() => { })
    )

    let name, surname, email, password, age, gender, _id, place
    const GENDERS = ['male', 'female', 'non-binary']

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        age = floor(random() * 120)
        gender = GENDERS[floor(random() * GENDERS.length)]
        place = `house of ${name}`
    })

    describe('when user already exists', () => {

        beforeEach(() =>
            User.create({ name, surname, email, password, age, gender })
                .then(({ id }) => _id = id)
                .then(() => { })
        )

        it('should successfully publish a toilet post', () =>
            publishToilet(_id, place)
                .then(() => Toilet.findOne({ publisher: _id }))
                .then(toilet => {
                    
                    expect(toilet.publisher.toString()).to.equal(_id)
                    expect(toilet.place).to.equal(place)
                    expect(toilet.comments instanceof Array).to.equal(true)
                    expect(toilet.geolocation instanceof Array).to.equal(true)

                })
                .then(() => User.findById(_id).populate('publishedToilets'))
                .then(user => {
                    expect(user.publishedToilets instanceof Array).to.equal(true)
                    expect(user.publishedToilets[0]).not.to.be.undefined
                    expect(user.publishedToilets[0].publisher.toString()).to.equal(_id)
                    expect(user.publishedToilets[0].place).to.equal(place)
                    expect(user.publishedToilets[0].comments instanceof Array).to.equal(true)
                    expect(user.publishedToilets[0].geolocation instanceof Array).to.equal(true)
                })
                .then(() => { })
        )
    })

    describe('when the user does not exist', () => {
        beforeEach(() => User.deleteMany().then(() => { }))

        it('should fail to post a toilet if the user does not exist', () =>
            publishToilet(_id, place)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({ message }) => {
                    expect(message).not.to.be.undefined
                    expect(message).to.equal(`user with id ${_id} does not exist`)
                })
                .then(() => { })
        )
    })

    describe('when the user is deactivated', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password, age, gender })
                .then(({ id }) => _id = id)
                .then(() => User.findByIdAndUpdate(_id, { $set: { deactivated: true } }))
                .then(() => { })
        )
        it('should fail to post a toilet if the user is deactivated', () =>
            publishToilet(_id, place)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({ message }) => {
                    expect(message).not.to.be.undefined
                    expect(message).to.equal(`user with id ${_id} is deactivated`)
                })
        )
    })

    describe('unhappy paths', () => {
        beforeEach(() =>
            User.create({ name, surname, email, password, age, gender })
                .then(({ id }) => _id = id)
                .then(() => { })
        )

        it('should fail on a non-string place', () => {
            place = 9328743289
            expect(() => publishToilet(_id, place)).to.throw(TypeError, `place ${place} is not a string`)

            place = false
            expect(() => publishToilet(_id, place)).to.throw(TypeError, `place ${place} is not a string`)

            place = undefined
            expect(() => publishToilet(_id, place)).to.throw(TypeError, `place ${place} is not a string`)

            place = []
            expect(() => publishToilet(_id, place)).to.throw(TypeError, `place ${place} is not a string`)
        })

        it('should fail on a non-string id', () => {
            _id = 9328743289
            expect(() => publishToilet(_id)).to.throw(TypeError, `id ${_id} is not a string`)

            _id = false
            expect(() => publishToilet(_id)).to.throw(TypeError, `id ${_id} is not a string`)

            _id = undefined
            expect(() => publishToilet(_id)).to.throw(TypeError, `id ${_id} is not a string`)

            _id = []
            expect(() => publishToilet(_id)).to.throw(TypeError, `id ${_id} is not a string`)
        })
    })
    
    after(() =>
        Promise.all([User.deleteMany(), Toilet.deleteMany()])
            .then(() => mongoose.disconnect())
    )
})