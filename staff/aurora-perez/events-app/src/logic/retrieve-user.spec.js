const { random } = Math
const {mongoose, models: { User }} = require("events-data")
const { retrieveUser } = require(".")

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

describe('retrieveUser', () => {
    let name, surname, email, password, token

    beforeAll(async() => {
        return await mongoose.connect(TEST_MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        return await User.deleteMany()        
    })

    beforeEach(() => {
        name = 'name-' + Math.random()
        surname = 'surname-' + Math.random()
        email = Math.random() + '@mail.com'
        password = 'password-' + Math.random()
    })

    describe('when user alredy exists', ()=> {
        beforeEach( async () => {
            await User.create({ name, surname, email, password })

            debugger

            const response = await fetch(`${TEST_MONGODB_URL}/users/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            data = await response.json()

            const { token } = data
        })

        it('should succeed on correct token', async() => {
            const user = await retrieveUser(token)

            expect(error).toBeUndefined()
            expect(user).toBeDefined()
            expect(user.name).toBe(name)
            expect(user.surname).toBe(surname)
            expect(user.username).toBe(username)
            expect(user.password).toBeUndefined()

        })

        //  it('should succeed on correct token', done =>
        //     retrieveUser(token, (error, user) => {
        //         expect(error).toBeUndefined()

        //         expect(user).toBeDefined()

        //         const VALID_KEYS = ['name', 'surname', 'username']
        //         Object.keys(user).forEach(key => VALID_KEYS.includes(key))
                
        //         expect(user.name).toBe(name)
        //         expect(user.surname).toBe(surname)
        //         expect(user.username).toBe(username)
        //         expect(user.password).toBeUndefined()

        //         done()
        //     })
        // )
    })
})