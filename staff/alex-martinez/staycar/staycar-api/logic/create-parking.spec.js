require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Parking } } = require('staycar-data')

const createParking = require('./create-parking')

const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('crateParking', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Parking.deleteMany()]))
    )

    let name, surname, username, password, parkingName

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
        parkingName = `parkingName-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, username, password })
                )
                .then(user => _id = user.id)
        )

        it('should succed on correct user id', () =>
            createParking(_id, parkingName )
                .then((res) => {
                    expect(res).to.be.an('object')
                })
        )
    })

    it('should fail on non string id', () => {
        let id = 2
        expect(() => createParking(id)).to.throw(TypeError, `id ${id} is not a string`)
    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Parking.deleteMany()]).then(() => mongoose.disconnect()))
    
})