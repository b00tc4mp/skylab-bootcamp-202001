require('dotenv').config()
const { random } = Math
const { mongoose, User, Company } = require('crediday-models')
const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL, REACT_APP_API_URL: API_URL } } = process
const { expect } = require('chai')
const fetch = require("node-fetch")
const confirmCompany = require('./confirm-company')

describe('confirmCompany', () => {

  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await Promise.all([Company.deleteMany(), User.deleteMany()])
  })

  let companyName, email, username, password

  beforeEach(async () => {
    companyName = (`companyName-${random()}`).slice(0, 19)
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
    let user

    beforeEach(async () => {
      user = await User.findOne({ email })
    })

    it('Should succeed confirming company', async () => {
      const { message } = await confirmCompany(user.company.toString())
      expect(message).to.be.a('string')
      expect(message).to.equal('Company successfully confirmed by email')
    })

    it('Should fail with syntax error', () => {
      try {
        confirmCompany(123)
        throw new Error('should not reach this point')

      } catch (error) {
        expect(error.message).to.equal('companyId 123 is not a string')
      }
    })

    it('Should fail with wrong companyId', async () => {
      try {
        await confirmCompany('adf')
        throw new Error('should not reach this point')
      } catch (error) {
        expect(error.message).to.equal('Invalid id')
      }
    })

  })

  after(async () => {
    await Promise.all([Company.deleteMany(), User.deleteMany()])
    await mongoose.disconnect()
  })
})