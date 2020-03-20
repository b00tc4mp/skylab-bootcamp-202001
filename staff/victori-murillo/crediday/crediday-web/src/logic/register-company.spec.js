const { random } = Math
const { mongoose, User, Company } = require('crediday-models')
const registerCompany = require('./register-company').default
const { compare } = require('bcryptjs')
const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

const API_URL = process.env.REACT_APP_API_URL

describe('registerCompany', () => {

  let companyName, email, username, password, passwordValidation

  beforeAll(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await User.deleteMany()
  })

  beforeEach(() => {
    companyName = (`companyName-${random()}`).slice(0, 19)
    email = (`email-${random()}@mail.com`)
    username = (`username-${random()}`).slice(0, 19)
    password = (`password-${random()}`)
    passwordValidation = password
  })

  describe('When company or username already exists', () => {
    beforeEach(async () => {
      await fetch(`${API_URL}/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, username, email, password,  })
      })
    })

    it('Should fail because companyName already exist', async () => {
      try {
        await registerCompany({companyName, email, username, password, passwordValidation})
        throw new Error('should not reach this point')

      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe('El nombre de Compañia ya existe')
      }
    })

    afterEach(async () => {
      await User.deleteMany()
      await Company.deleteMany()
    })

  })


  it('should succed on correct user data', async () => {
    const result = await registerCompany({ companyName, email, username, password, passwordValidation })
    expect(result).toBe(email)

    const user = await User.findOne({ email })

    expect(typeof user).toBe('object')
    expect(typeof user.id).toBe('string')
    // expect(user.companyName).toBe(companyName) -> only with populate
    expect(user.email).toBe(email)
    expect(user.username).toBe(username)
    expect(user.created).toBeInstanceOf(Date)

    expect(await compare(password, user.password)).toBeTruthy()
  })

  afterAll(async () => {
    await User.deleteMany()
    await Company.deleteMany()
    await mongoose.disconnect()
  })
})