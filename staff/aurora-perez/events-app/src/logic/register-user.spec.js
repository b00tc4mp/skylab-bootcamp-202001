const { random } = Math
const {mongoose, models: { User }} = require("events-data")
const { registerUser } = require(".")

const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

describe("registerUser", () => {
  let name, surname, email, password

  beforeAll(async () => {
    return await mongoose.connect(TEST_MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    return await User.deleteMany()
  })

  beforeEach(() => {
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
  })

  it("should succeed on correct user data", async () => {
    const result = await registerUser(name, surname, email, password)

    expect(result).not.toBeDefined()

    const user = await User.findOne({ email })

    expect(user).toBeDefined()
    //expect(typeof user.id).toBe('string')
    expect(user.name).toBe(name)
    expect(user.surname).toBe(surname)
    expect(user.email).toBe(email)
    expect(user.password).toBe(password) // TODO encrypt this field!
    expect(user.created).toBeInstanceOf(Date)
  })

  it('should fail on already existing user', async () => {
    try {
      await registerUser(name, surname, email, password )

    } catch( error ) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeDefined()
      expect(error.message).toBe(`user with email "${email}" already exists`)

    }
  })

   describe('trying to register on invalid data', () => {
        it('should fail on a non string name', async () => {
            let _error
            name = 45438

            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`name ${name} is not a string`)
            
            
            name = false
            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`name ${name} is not a string`)


            name = undefined
            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`name ${name} is not a string`)
            
            
            name = []
            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`name ${name} is not a string`)
        })


        it('should fail on a non string surname', async () => {
            let _error
            surname = 45438

            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`surname ${surname} is not a string`)


            surname = false
            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`surname ${surname} is not a string`)


            surname = undefined
            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`surname ${surname} is not a string`)


            surname = []
            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`surname ${surname} is not a string`)
        })


        it('should fail on a non string email', async () => {
            let _error
            email = 45438

            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`email ${email} is not a string`)


            email = false
            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`email ${email} is not a string`)


            email = undefined
            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`email ${email} is not a string`)


            email = []
            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`email ${email} is not a string`)
        })


        it('should fail on a non valid email address', async () => {
            let _error
            email = 'asjdvsdhjv'

            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`${email} is not an e-mail`)


            email = '123@a'
            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`${email} is not an e-mail`)
        })

        it('should fail on a non string password', async () => {
            let _error
            password = 45438

            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`password ${password} is not a string`)


            password = false
            try {
                await registerUser(name, surname, email, password)

            } catch (error) {
                _error = error

            } expect(_error.message).toBe(`password ${password} is not a string`)
            
            
            password = undefined
            
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            
            } expect(_error.message).toBe(`password ${password} is not a string`)
            
            
            password = []
            try {
                await registerUser(name, surname, email, password)
            } catch (error) {
                _error = error
            } expect(_error.message).toBe(`password ${password} is not a string`)
        })
    })


  afterAll(async () => {
    return await User.deleteMany()
    return await mongoose.disconnect()
  })
})
