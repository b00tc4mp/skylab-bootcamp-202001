require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { Ticket, Parking, User } } = require('staycar-data')
const bcrypt = require('bcryptjs')

const exitVehicle = require('./exit-vehicle')


const { env: { TEST_MONGODB_URL } } = process

describe('exitVehicle', () => {
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
        //parkingName = `parking-${random()}`
        parkingName = 'test-Parking'
        rate = random()
        //carPlate = `plate-${random()}`
        carPlate = '1234AAA'
        totalLots = 20
        lots = []

        for (let i = 1; i <= totalLots; i++) {
            let lot = {}
            lot.number = i
            lot.status = false
      
            lots.push(lot)
          }
    })

    describe('when user already create parking', () => {

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, username, password })
                )
                .then(user => _id = user.id)  
                .then(() => {
                    
                    //return Parking.create({parkingName, rate, totalLots, lots})
                    const pk = Parking.create({parkingName, rate, totalLots, lots})
                    return pk
                        
                })
                .then(() => {
                    const ticketValid = Ticket.create({carPlate, entryHour: new Date(), parkingName})
                    ticketValid.validated = true
                    debugger
                    return ticketValid
                })
        )

        it('should succed on correct car plate and parking name', () =>{
           
            exitVehicle(carPlate, parkingName)
                .then(() => {
                   
                    return Ticket.findOne({carPlate})
                })
                .then((ticket) => {
                    
                    expect(ticket.carPlate).to.be.equal(carPlate)
                    expect(ticket.parkingName).to.be.equal(parkingName)
                })
                .then(() => {
                    expect(pk.totalLots).to.be.equal(20)
                })
        })

    })

    it('should fail on non string car plate', () => {
        let carPlate = 1234
        expect(() => exitVehicle(carPlate, 'parkingName')).to.throw(TypeError, `carPlate ${carPlate} is not a string`)
    })
    it('should fail on non string parking name', () => {
        let parkingName = true
        expect(() => exitVehicle('1234JJJ', parkingName)).to.throw(TypeError, `parkingName ${parkingName} is not a string`)
    })
    

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Parking.deleteMany()], Ticket.deleteMany()).then(() => mongoose.disconnect()))
    //after(() => User.deleteMany().then(() => mongoose.disconnect()))
})