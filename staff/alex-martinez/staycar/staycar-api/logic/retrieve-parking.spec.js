require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveParking = require('./retrieve-parking')
const bcrypt = require('bcryptjs')
const { mongoose, models: { User, Parking } } = require('staycar-data')

describe('retrieveParking', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, username, password, pkName, rate, totalLots

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
        pkName = `pkname-${random()}`
        rate = random()
        totalLots = 20
    })

    describe('when user already create a parking', () => {
        
        let _id

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, username, password })
                )
                .then(user => _id = user.id)  
                .then(() => 
                    
                    Parking.create({parkingName: pkName, rate, totalLots})
                )
        )

        it('should succeed on valid parking name', () =>
            retrieveParking(_id, pkName)
                .then(pk => {
                    expect(pk.parkingName).to.be.equal(pkName)
                })
        )
    })
    it('should fail on non string id', () => {
        let id = 123
        expect(() => retrieveParking(id, 'parkingName')).to.throw(TypeError, `id ${id} is not a string`)
    })
    it('should fail on non string parking name', () => {
        let parkingName = 5664
        expect(() => retrieveParking('123', parkingName)).to.throw(TypeError, `parkingName ${parkingName} is not a string`)
    })

    // TODO more happies and unhappies

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})