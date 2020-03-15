const {random} = Math
const {mongoose, models: {User}} = require('karmark-data')
const {registerUser} = require('./index')
const {ContentError, NotAllowedError} = require('karmark-errors')
const bcrypt = require('bcryptjs')

const {env: {REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL}} = process

describe('registerUser', () => {
    let name, surname, username, password

    beforeAll(async () => {
        await mongoose.connect(TEST_MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

        await User.deleteMany()
    })

    beforeEach(() =>{
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        password = `password-${random()}`
    })

    it('should succeed on correct user data', async () => {
        const result = await registerUser(name, surname, username, password)

        expect(result).toBeUndefined()

        const user = await User.findOne({ username })

        expect(user).toBeDefined()
        expect(typeof user.id).toBe('string')
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.username).toBe(username)
        expect(user.created).toBeInstanceOf(Date)

        const validPassword = await bcrypt.compare(password, user.password)

        expect(validPassword).toBeTruthy()

    })

    it('should fain on empty parameter', async() =>{
        try {
            let _name = ''
            await registerUser(_name, surname, username, password)
        } catch (error) {
            expect(error).toBeInstanceOf(ContentError)
            expect(error.message).toBe('name is empty')
        }
        try {
            let _surname = ''
            await registerUser(name, _surname, username, password)
        } catch (error) {
            expect(error).toBeInstanceOf(ContentError)
            expect(error.message).toBe('surname is empty')
        }
        try {
            let _username = ''
            await registerUser(name, surname, _username, password)
        } catch (error) {
            expect(error).toBeInstanceOf(ContentError)
            expect(error.message).toBe('username is empty')
        }
        try {
            let _password = ''
            await registerUser(name, surname, username, _password)
        } catch (error) {
            expect(error).toBeInstanceOf(ContentError)
            expect(error.message).toBe('password is empty')
        }

    })

    it('should fail on non string name', async () => {
        try {
            name = 4
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`name ${name} is not a string`)
        }
        try {
            name = true
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`name ${name} is not a string`)
        }
        try {
            name = []
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`name ${name} is not a string`)
        }
        try {
            name = {}
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`name ${name} is not a string`)
        }
    })

    it('should fail on non string surname', async () => {
        try {
            surname = 4
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`surname ${surname} is not a string`)
        }
        try {
            surname = true
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`surname ${surname} is not a string`)
        }
        try {
            surname = []
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`surname ${surname} is not a string`)
        }
        try {
            surname = {}
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`surname ${surname} is not a string`)
        }
    })

    it('should fail on non string surname', async () => {
        try {
            username = 4
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`username ${username} is not a string`)
        }
        try {
            username = true
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`username ${username} is not a string`)
        }
        try {
            username = []
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`username ${username} is not a string`)
        }
        try {
            username = {}
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`username ${username} is not a string`)
        }
    })

    it('should fail on non string surname', async () => {
        try {
            password = 4
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`password ${password} is not a string`)
        }
        try {
            password = true
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`password ${password} is not a string`)
        }
        try {
            password = []
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`password ${password} is not a string`)
        }
        try {
            password = {}
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(TypeError)
            expect(error.message).toBe(`password ${password} is not a string`)
        }
    })

    it('should fail on already existing username', async () => {
        await User.create({name, surname, username, password, created: new Date})

        try {
            debugger
            await registerUser(name, surname, username, password)

        } catch (error) {
            expect(error).toBeInstanceOf(NotAllowedError)
            expect(error.message).toBe('')
        }
    })

    afterAll(async () => {
        await User.deleteMany()
        await mongoose.disconnect()
    })
})