require('dotenv').config()

const { expect } = require('chai')
const { random, round } = Math
const { mongoose, models: { User, Parking } } = require('staycar-data')

const addLotsAmount = require('./add-lots-amount')

const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('addLotsAmount', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Parking.deleteMany()]))
    )

    let name, surname, username, password, totalLots, pkName

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
        totalLots = round(random()*(20-1)+parseInt(1))
        pkName = `pkname-${random()}`
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, username, password })
                )
                .then(user => _id = user.id)  
                .then(() => 
                    
                    Parking.create({parkingName: pkName})
                )
        )

        it('should succed on correct data', () =>
            addLotsAmount(_id, pkName, totalLots)
                .then((res) => {
                    expect(res).to.be.an('undefined')
                })
        )
    })

    it('should fail on non number totalLots', () => {
        let totalLots = '20'
        let pkId = '1234'
        expect(() => addLotsAmount('1', pkId, totalLots)).to.throw(TypeError, `number ${totalLots} is not a number`)
    })
    it('should fail on non string id', () => {
        let id = 2
        let pkId = '1234'
        expect(() => addLotsAmount(id, pkId ,20)).to.throw(TypeError, `id ${id} is not a string`)
    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Parking.deleteMany()]).then(() => mongoose.disconnect()))
    //after(() => User.deleteMany().then(() => mongoose.disconnect()))
})