import registerUser from './register-user'
const { mongoose, models: { User } } = require('poopinion-data')
const { random, floor } = Math
const bcrypt = require('bcryptjs')

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

describe('registerUser', () => {
    let name, surname, email, password, age, gender
    const GENDERS = ['male', 'female','non-binary']
    
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-poopinion', { useNewUrlParser: true, useUnifiedTopology: true })

        await User.deleteMany()
    })

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        age = floor(random() * 100)
        gender = GENDERS[floor(random() * GENDERS.length)]
    })

    it('should succeed on correct user data', async () => {
        const result = await registerUser(name, surname, email, age, gender, password)

        expect(result).toBeUndefined()

        const user = await User.findOne({ email })
        
        expect(user).toBeDefined()
        expect(typeof user.id).toBe('string')
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.created).toBeInstanceOf(Date)

        const validPassword = await bcrypt.compare(password, user.password)

        expect(validPassword).toBeTruthy()
    })

    // TODO unhappy paths and other happies if exist

    afterAll(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })
})