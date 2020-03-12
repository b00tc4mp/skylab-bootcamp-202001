require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { Ticket, Parking, User } } = require('staycar-data')
const bcrypt = require('bcryptjs')

const entryVehicle = require('./entry-vehicle')


const { env: { TEST_MONGODB_URL } } = process

describe.only('entryVehicle', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([Ticket.deleteMany(), Parking.deleteMany(), User.deleteMany()]))
    )

    let name, surname, username, password, pkName, rate, carPlate, totalLots, lots

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
        parkingName = `parking-${random()}`
        rate = random()
        carPlate = `plate-${random()}`
        totalLots = 20
        lots = []

        for (let i = 1; i <= totalLots; i++) {
            let lot = {}
            lot.number = i
            lot.status = false
      
            lots.push(lot)
          }
    })

    describe('when user already exists', () => {

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, username, password })
                )
                .then(user => _id = user.id)  
                .then(() => {
                    
                    return Parking.create({parkingName, rate, totalLots, lots})
                        
                })
        )

        it('should succed on correct plate', () =>{
            debugger
            entryVehicle(carPlate, parkingName)
                .then(res => {
                    expect(res).to.be.an('undefined')
                    //Parking.find()...
                })
                //.catch(error => console.log(error.message))
        })
    })

    /* it('should fail on non number totalLots', () => {
        let totalLots = '20'
        let pkId = '1234'
        expect(() => addLotsAmount('1', pkId, totalLots)).to.throw(TypeError, `number ${totalLots} is not a number`)
    })
    it('should fail on non string id', () => {
        let id = 2
        let pkId = '1234'
        expect(() => addLotsAmount(id, pkId ,20)).to.throw(TypeError, `id ${id} is not a string`)
    }) */

    // TODO more happies and unhappies

    //after(() => Promise.all([User.deleteMany(), Parking.deleteMany()], Ticket.deleteMany()).then(() => mongoose.disconnect()))
    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})