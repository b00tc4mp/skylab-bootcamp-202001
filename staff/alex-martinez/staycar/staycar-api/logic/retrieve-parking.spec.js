require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveParking = require('./retrieve-parking')
const { mongoose, models: { User, Parking } } = require('staycar-data')

describe.only('retrieveParking', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, username, password, pkName

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
        pkName = `pkname-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, username, password })
                .then(({ id }) => _id = id)
                .then(() => {
                    Parking.create({parkingName: pkName})
                })

        )

        it('should succeed on valid parking name', () =>
            retrieveParking(_id, pkName)
                .then(pk => {
                    expect(pk).to.be.a('string')
                    
                })
        )
    })

    // TODO more happies and unhappies

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})