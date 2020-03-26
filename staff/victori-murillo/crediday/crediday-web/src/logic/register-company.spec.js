require('dotenv').config()
const { random } = Math
const { mongoose, User, Company } = require('crediday-models')
const { bcrypt: { compare } } = require('crediday-utils')
const registerCompany = require('./register-company')
const { env: { REACT_APP_TEST_MONGODB_URL: TEST_MONGODB_URL, REACT_APP_API_URL: API_URL } } = process
const { expect } = require('chai')
const fetch = require("node-fetch")

describe('registerCompany', () => {
  let companyName, email, username, password, passwordValidation

  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await Promise.all([Company.deleteMany(), User.deleteMany()])
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
        body: JSON.stringify({ companyName, username, email, password, })
      })
    })

    it('Should fail because companyName already exist', async () => {
      try {
        await registerCompany({ companyName, email, username, password, passwordValidation })
        throw new Error('should not reach this point')

      } catch (error) {
        expect(error).to.be.an.instanceof(Error)
        expect(error.message).to.equal('El nombre de Compañia ya existe')
      }
    })

    afterEach(async () => {
      await User.deleteMany()
      await Company.deleteMany()
    })
  })

  it('should succed on correct user data', async () => {
    const response = await registerCompany({ companyName, email, username, password, passwordValidation })
    expect(response.email).to.equal(email)

    const user = await User.findOne({ email })

    expect(typeof user).to.equal('object')
    expect(typeof user.id).to.equal('string')
    // expect(user.companyName).toBe(companyName) -> only with populate
    expect(user.email).to.equal(email)
    expect(user.username).to.equal(username)
    expect(user.created).to.be.an.instanceof(Date)
    expect(await compare(password, user.password)).to.be.true
  })

  after(async () => {
    await Promise.all([Company.deleteMany(), User.deleteMany()])
    await mongoose.disconnect()
  })
})