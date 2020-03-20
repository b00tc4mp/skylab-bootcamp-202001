const { random } = Math
const { mongoose, User, Company } = require('crediday-models')
const { login } = require('.')
const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL } } = process

const API_URL = process.env.REACT_APP_API_URL

describe('registerCompany', () => {

  let companyName, email, username, password, passwordValidation

  beforeAll(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await User.deleteMany()
    await Company.deleteMany()
  })

  beforeEach(async () => {
    companyName = (`companyName-${random()}`).slice(0, 19)
    email = (`email-${random()}@mail.com`)
    username = (`username-${random()}`).slice(0, 19)
    password = (`password-${random()}`)
    passwordValidation = password

    await fetch(`${API_URL}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName, username, email, password })
    })

  })

  describe('When company and username already exists', () => {

    it('Should fail when not confirm the mail', async () => {
      try {
        await login({ username, password })

      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toBe("Confirma tu correo electrónico")
      }
    })

    it('should succed on correct username and password, after confirm email', async () => {

      const company = await Company.findOne({ name: companyName })
      const user = await User.findOne({ email })

      // Confirming email
      await fetch(`${API_URL}/companies/email/${company.id}`, {method: 'PATCH'})

      const token = await login({ username, password })

      expect(typeof token).toBe('string')
      expect(token.length).toBeGreaterThan(0)

      const { sub, com } = JSON.parse(atob(token.split('.')[1]))

      expect(com).toBe(company.id)
      expect(sub).toBe(user.id)
    })

  })

  afterAll(async () => {
    await User.deleteMany()
    await Company.deleteMany()
    await mongoose.disconnect()
  })
})