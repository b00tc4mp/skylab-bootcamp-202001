require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const confirmVerificationCode = require('./confirm-verification-code')
const { Company, User } = require('crediday-models')
const { registerCompany, confirmCompany } = require("..")

describe('confirmVerificationCode', () => {
  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await Promise.all([Company.deleteMany(), User.deleteMany()])
  })

  let companyName, username, email, password, code

  beforeEach(() => {
    companyName = (`companyname-${random()}`).slice(0, 19)
    username = (`username-${random()}`).slice(0, 29)
    email = (`email${random()}@mail.com`)
    password = (`password${random()}`)
    code = (`${random()}`).slice(0, 6)
  })

  describe('when company and owner already exist', () => {
    let _user

    beforeEach(async () => {
      await registerCompany({ companyName, username, email, password })
      const company = await Company.findOne({ name: companyName })
      await confirmCompany(company.id)
      _user = await User.findOne({ email })
    })

    it('should fail to try to confirm code ', async () => {
      try {
        await confirmVerificationCode({ code, email })
        throw new Error('should not reach this point')
      } catch (error) {
        expect(error.message).to.equal('Código incorrecto')
      }

    })
  })

  after(() =>
    Promise.all([Company.deleteMany(), User.deleteMany()])
      .then(() => mongoose.disconnect()))
})