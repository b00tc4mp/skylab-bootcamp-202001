const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL
const jwt = require('jsonwebtoken')
const { env: { JWT_SECRET,  JWT_EXP } } = process
const { mongoose, models: {User, Event} } = require('events-data')
debugger
describe('create-event', () => {

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        await Event.deleteMany()
        return await Event.deleteMany()
    })

    let title, description, location, date

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = Math.random() + '@mail.com'
        password = 'password-' + Math.random()
        title = 'title-' + Math.random()
        decription = 'description-' + Math.random()
        location = 'location-' + Math.random()
        date = new Date
    })

    describe('a', () => {
        let user, token

        beforeEach(async () => {
            
            user = await User.create({name, surname, email, password})
            _id = id
            return token = jwt.sign({ sub: _id }, JWT_SECRET, { expiresIn: JWT_EXP })
        })

    })

    afterEach(async () => {
        await User.deleteMany()
        return await Event.deleteOne({ _id: id })
    })

    afterAll(async () => {
        await User.deleteMany()
        await Event.deleteMany()
        return await mongoose.disconnect()
    })

})