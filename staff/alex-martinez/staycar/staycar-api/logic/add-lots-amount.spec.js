require('dotenv').config()

const { expect } = require('chai')
const { random, round } = Math
const { mongoose, models: { User, Parking } } = require('staycar-data')

const addLotsAmount = require('./add-lots-amount')

const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe.only('addLotsAmount', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Parking.deleteMany()]))
    )

    let name, surname, username, password, totalLots

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`,
        totalLots = round(random()*(20-1)+parseInt(1));
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

        it('should succed on correct data', () =>
            addLotsAmount(_id, totalLots)
                .then((res) => {
                    expect(res).to.be.an('undefined')
                })
        )
    })

    it('should fail on non number totalLots', () => {
        let totalLots = '20'
        expect(() => addLotsAmount('1', totalLots)).to.throw(TypeError, `totalLots ${totalLots} is not a number`)
    })
    it('should fail on non string id', () => {
        let id = 2
        expect(() => addLotsAmount(id, 20)).to.throw(TypeError, `id ${id} is not a string`)
    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Parking.deleteMany()]).then(() => mongoose.disconnect()))
    
})