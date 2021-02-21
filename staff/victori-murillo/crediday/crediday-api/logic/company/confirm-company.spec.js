require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, Company, User, mongoose: { Mongoose: { prototype: { CastError } } } } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const confirmCompany = require('./confirm-company')

describe('confirmCompany', () => {
  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await Promise.all([Company.deleteMany(), User.deleteMany()])
  })

  let companyName, username, email, password, company

  beforeEach(async () => {
    companyName = (`companyname${random()}`).slice(0, 19)
    username = (`username${random()}`).slice(0, 29)
    email = (`email${random()}@mail.com`)
    password = (`password${random()}`)

    company = await Company.create({ name: companyName })
  })


  it('should confirm a company successfully', async () => {
    const response = await confirmCompany(company.id)
    expect(response).to.be.an('undefined')
  })

  it('should fail with company not foud', async () => {
    const randomCompanyId = `${random()}`

    try {
      await confirmCompany(randomCompanyId)
      throw new Error('should now reach this point')

    } catch (error) {
      expect(error).to.instanceOf(CastError)
      expect(error.message).to.equal(`Cast to ObjectId failed for value "${randomCompanyId}" at path "_id" for model "Company"`)
    }
  })

  it('should fail with company id is not a string', async () => {
    const randomCompanyId = 1235

    try {
      await confirmCompany(randomCompanyId)
      throw new Error('should now reach this point')

    } catch (error) {
      expect(error.message).to.equal(`companyId ${randomCompanyId} is not a string`)
    }
  })

  after(async () => {
    await Promise.all([Company.deleteMany(), User.deleteMany()])
    await mongoose.disconnect()
  })
})