require('dotenv').config()
const { random } = Math
const { mongoose, User, Company } = require('crediday-models')
const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL, REACT_APP_API_URL: API_URL } } = process
const { expect } = require('chai')
const fetch = require("node-fetch")
const confirmCompany = require('./confirm-company')
const login = require('./login')
const registerUser = require('./register-user')

describe('registerUser', () => {

  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await Promise.all([Company.deleteMany(), User.deleteMany()])
  })

  let companyName, email, username, password

  beforeEach(async () => {
    companyName = (`companyname-${random()}`).slice(0, 19)
    email = (`email-${random()}@mail.com`)
    username = (`username-${random()}`).slice(0, 19)
    password = (`password-${random()}`)

    await fetch(`${API_URL}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName, username, email, password })
    })

  })

  describe('When company and username already exists', () => {
    let token, firstName

    beforeEach(async () => {
      const company = await Company.findOne({ name: companyName })
      await confirmCompany(company._id.toString())

      const response = await login({ username, password })
      token = response.token

      firstName = (`name-${random()}`).slice(0, 20)
    })

    it('Should succed on register a new customer', async () => {
      const { message } = await registerUser({ firstName, token })
      expect(message).to.be.a('string')
      expect(message).to.equal('User registered successfully')
    })

    it('Should fail with syntax error', () => {
      try {
        registerUser({ firstName: 123, token })
        throw new Error('should not reach this point')

      } catch (error) {
        expect(error.message).to.equal('Nombre 123 is not a string')
      }
    })

    it('Should fail with firstName so long', async () => {
      const longName = (`long-name-${random()}${random()}`)
      try {
        await registerUser({ firstName: longName, token })
        throw new Error('should not reach this point')

      } catch (error) {
        expect(error.message).to.equal('firstName debe tener máximo 30 caracteres')
      }
    })

  })

  after(async () => {
    await Promise.all([Company.deleteMany(), User.deleteMany()])
    await mongoose.disconnect()
  })
})