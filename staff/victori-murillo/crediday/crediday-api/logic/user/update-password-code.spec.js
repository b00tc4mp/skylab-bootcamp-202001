require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const updatePasswordCode = require('./update-password-code')
const { Company, User } = require('crediday-models')
const { registerCompany, confirmCompany, confirmDataToRecoverPassword } = require("..")

describe('updatePasswordCode', () => {
  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await Promise.all([Company.deleteMany(), User.deleteMany()])
  })

  let companyName, username, email, password, code

  beforeEach(() => {
    companyName = (`companyname-${random()}`).slice(0, 19)
    username = (`username-${random()}`).slice(0, 29)
    email = 'victori.murillo.mora@gmail.com'
    password = (`password${random()}`)
    code = (`${random()}`).slice(0, 8)
  })

  describe('when company and owner already exist', () => {
    let _user

    beforeEach(async () => {
      await registerCompany({ companyName, username, email, password })
      const company = await Company.findOne({ name: companyName })
      await confirmCompany(company.id)
      await confirmDataToRecoverPassword({ company: company.name, email })
      _user = await User.findOne({ email })
    })

    it('should fail to try to confirm code', async () => {
      const newPassword = (`${random()}`).slice(0, 10)
      try {
        await updatePasswordCode({ code, email, password: newPassword })

        throw new Error('should not reach this point')
      } catch (error) {
        expect(error.message).to.equal('Código incorrecto')
      }
    })

    it('should fail with wrong email', async () => {
      const newPassword = (`${random()}`).slice(0, 10)
      try {
        await updatePasswordCode({ code, email: email + 'wrong', password: newPassword })
        throw new Error('should not reach this point')
      } catch (error) {
        expect(error.message).to.equal('Ningún usuario tiene ese correo electrónico')
      }
    })

    afterEach(async () => {
      Promise.all([Company.deleteMany(), User.deleteMany()])
    })
  })

  after(() =>
    Promise.all([Company.deleteMany(), User.deleteMany()])
      .then(() => mongoose.disconnect()))
})