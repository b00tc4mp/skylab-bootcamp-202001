require('dotenv').config()
const { random } = Math
const { mongoose, User, Company } = require('crediday-models')
const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL, REACT_APP_API_URL: API_URL } } = process
const { expect } = require('chai')
const login = require('./login')
const fetch = require("node-fetch")
const atob = require("atob")


describe('login', () => {

  let companyName, email, username, password, passwordValidation

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
        expect(error).to.be.an.instanceof(Error)
        expect(error.message).to.equal("Confirma tu correo electrónico")
      }
    })

    it('should succed on correct username and password, after confirm email', async () => {

      const company = await Company.findOne({ name: companyName })
      const user = await User.findOne({ email })

      // Confirming email
      await fetch(`${API_URL}/companies/email/${company.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      })

      const { token } = await login({ username, password })

      expect(typeof token).to.equal('string')
      expect(token.split(".")).to.have.lengthOf(3)

      const { sub } = JSON.parse(atob(token.split('.')[1]))

      expect(sub).to.equal(user.id)
    })

  })

  after(async () => {
    await User.deleteMany()
    await Company.deleteMany()
    await mongoose.disconnect()
  })
})