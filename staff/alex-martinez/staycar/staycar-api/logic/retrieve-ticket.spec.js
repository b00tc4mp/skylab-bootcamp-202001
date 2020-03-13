require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveTicket = require('./retrieve-ticket')
const bcrypt = require('bcryptjs')
const { mongoose, models: { User, Parking, Ticket} } = require('staycar-data')

describe('retrieveTicket', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            
            .then(() => Promise.all([User.deleteMany(), Parking.deleteMany(), Ticket.deleteMany()]))
    )

    let name, surname, username, password, parkingName, rate, totalLots, carPlate

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
        parkingName = 'parkingTest'
        rate = random()
        totalLots = 20
        carPlate = '1234KKK'
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
                    
                    Parking.create({parkingName, rate, totalLots})
                    .then(() =>{
                        
                        return Ticket.create({carPlate, entryHour: new Date(), parkingName})
                    })
                )
        )

        it('should succeed on valid car plate', () =>
            retrieveTicket(carPlate, parkingName)
                .then((ticket) => {
                   
                    expect(ticket.carPlate).to.be.equal(carPlate)
                    expect(ticket.parkingName).to.be.equal(parkingName)
                })
        )
    })
    it('should fail on non string car plate', () => {
        let carplate = 1234
        expect(() => retrieveTicket(carplate, 'parkingname')).to.throw(TypeError, `carPlate ${carplate} is not a string`)
    })
    it('should fail on non string parking name', () => {
        let parkingname = false
        expect(() => retrieveTicket('1234AAA', parkingname)).to.throw(TypeError, `parkingName ${parkingname} is not a string`)
    })

    // TODO more happies and unhappies

    //after(() => User.deleteMany().then(() => mongoose.disconnect()))
    after(() => Promise.all([User.deleteMany(), Parking.deleteMany(),Ticket.deleteMany()]).then(() => mongoose.disconnect()))
})