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

    let name, surname, username, password, pkName, rate, carPlate, totalLots, lots, ticketId

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
        parkingName = 'test-Parking'
        rate = random()
        carPlate = '1234AAA'
        ticketId = `id-${random()}`
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
                    
                    const pk = Parking.create({parkingName, rate, totalLots, lots})
                    return pk
                        
                })
                .then(() => {
                    const ticketValid = Ticket.create({carPlate, entryHour: new Date(), ticketId, parkingName})
                    ticketValid.validated = true
                    ticketValid.exit = false
                    ticketValid.validatedTime = new Date()
                    
                    return ticketValid
                })
        )

        it('should succed on correct car plate and parking name', () =>{
           
            exitVehicle(ticketId, parkingName)
                .then(() => {
                   
                    return Ticket.findOne({ticketId})
                })
                .then((ticket) => {
                    expect(ticket).to.exist
                    expect(ticket.carPlate).to.be.equal(carPlate)
                    expect(ticket.parkingName).to.be.equal(parkingName)
                    expect(ticket.exit).to.be(false)
                    expect(ticket.validated).to.be(true)
                    expect(ticket.exit).to.be.an.instanceOf(Date)
                    expect(ticket.exit).to.be(true)
                    expect(ticket.validatedTime).to.be.an.instanceOf(Date)
                })
                .then(() => {
                    expect(pk.totalLots).to.be.equal(20)
                    expect(pk.lots.length).to.be.equal(totalLots)
                })
        })

    })

    it('should fail on non string ticket id', () => {
        let ticketId = 1234
        expect(() => exitVehicle(ticketId, 'parkingName')).to.throw(TypeError, `ticket id ${ticketId} is not a string`)
    })
    it('should fail on non string parking name', () => {
        let parkingName = true
        expect(() => exitVehicle('ticketId', parkingName)).to.throw(TypeError, `parking name ${parkingName} is not a string`)
    })

    after(() => Promise.all([User.deleteMany(), Parking.deleteMany()], Ticket.deleteMany()).then(() => mongoose.disconnect()))
    //after(() => User.deleteMany().then(() => mongoose.disconnect()))
})