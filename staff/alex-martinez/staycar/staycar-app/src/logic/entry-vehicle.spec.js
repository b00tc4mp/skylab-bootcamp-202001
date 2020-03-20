const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const TEST_JWT_SECRET = process.env.REACT_APP_TEST_JWT_SECRET
const { mongoose, models: { Parking, Ticket, User } } = require('staycar-data')
const { random } = Math
import entryVehicle from './entry-vehicle'


describe('entryVehicle', () => {
    
    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        return await Promise.resolve([User.deleteMany(), Ticket.deleteMany(), Parking.deleteMany()])
    })

    let parkingName, rate, totalLots, carPlate

    beforeEach(() => {
        
        parkingName = `parkingName-${random()}`
        rate = random()
        totalLots = 10
        carPlate = '1234KKK'
    })

    describe('when user and parking already exists', () => {
        
        beforeEach(async() => {
            
            await Parking.create({parkingName, rate, totalLots})
        })

        it('should succeed on right data', async () => {

            await entryVehicle(carPlate)
            const ticket = await Ticket.findOne({ carPlate })

            expect(ticket.carPlate).toBe(carPlate)
            expect(ticket.validated).toBe(false)
        })

    })

    it('should fail on non string carPlate', () => {
        let carPlate = 1234
        expect(() => entryVehicle(carPlate)).toThrow(TypeError, `carPlate ${carPlate} is not a string`)
    })

    afterAll(async () => {
        await Promise.all([User.deleteMany(), Ticket.deleteMany(), Parking.deleteMany()])
        return await mongoose.disconnect()
    })
})