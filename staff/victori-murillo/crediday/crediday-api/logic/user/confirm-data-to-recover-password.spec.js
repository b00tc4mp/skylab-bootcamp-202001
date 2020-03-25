require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const confirmDataToRecoverPassword = require('./confirm-data-to-recover-password')
const { Company, User } = require('crediday-models')
const { registerCompany, confirmCompany } = require("..")

describe('confirmDataToRecoverPassword', () => {
  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await Promise.all([Company.deleteMany(), User.deleteMany()])
  })

  let companyName, username, email, password

  beforeEach(() => {
    companyName = (`companyname-${random()}`).slice(0, 19)
    username = (`username-${random()}`).slice(0, 29)
    email = (`email${random()}@mail.com`)
    password = (`password${random()}`)
  })

  describe('when company and owner already exist', () => {
    let _user

    beforeEach(async () => {
      await registerCompany({ companyName, username, email, password })
      const company = await Company.findOne({ name: companyName })
      await confirmCompany(company.id)
      _user = await User.findOne({ email })
    })

    it('should confirm recover password successfully', async () => {
      const response = await confirmDataToRecoverPassword({ company: companyName, email })
      expect(response).to.equal('Data confirmed')
    })
  })

  after(() =>
    Promise.all([Company.deleteMany(), User.deleteMany()])
      .then(() => mongoose.disconnect()))
})