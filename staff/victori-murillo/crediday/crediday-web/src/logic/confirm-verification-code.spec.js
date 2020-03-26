require('dotenv').config()
const { random } = Math
const { mongoose, User, Company } = require('crediday-models')
const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL, REACT_APP_API_URL: API_URL } } = process
const { expect } = require('chai')
const fetch = require("node-fetch")
const confirmVerificationCode = require('./confirm-verification-code')


describe('confirmVerificationCode', () => {
  let companyName, email, username, password, code

  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await User.deleteMany()
    await Company.deleteMany()
  })

  beforeEach(async () => {
    companyName = (`companyName-${random()}`).slice(0, 19)
    email = (`email-${random()}@mail.com`)
    username = (`username-${random()}`).slice(0, 19)
    password = (`password-${random()}`)
    code = (`${random()}`).slice(0, 7)

    await fetch(`${API_URL}/companies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyName, username, email, password })
    })

  })

  describe('When company and username already exists', () => {

    it('Should fail when wrong code - sync', () => {
      try {
        confirmVerificationCode({ code, email })
        throw new Error('should not reach this point')

      } catch (error) {
        expect(error).to.be.an.instanceof(Error)
        expect(error.message).to.equal('Código incorrecto')
      }
    })

    it('Should fail when wrong code - async', async () => {
      try {
        await confirmVerificationCode({ code: code.slice(0, 6), email })
        throw new Error('should not reach this point')

      } catch (error) {
        expect(error).to.be.an.instanceof(Error)
        expect(error.message).to.equal('Código incorrecto')
      }
    })

  })

  after(async () => {
    await User.deleteMany()
    await Company.deleteMany()
    await mongoose.disconnect()
  })
})