require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, Company, User } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const { retrieveAllCompanies, registerCompany } = require('../')

describe('retrieveAllCompanies', () => {
  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await Promise.all([Company.deleteMany(), User.deleteMany()])
  })

  let companyName, username, email, password

  beforeEach(async () => {
    companyName = (`companyname${random()}`).slice(0, 19)
    username = (`username${random()}`).slice(0, 29)
    email = (`email${random()}@mail.com`)
    password = (`password${random()}`)
    await registerCompany({ companyName, username, email, password })
  })


  it('should return all companies, 1 company', async () => {
    const companies = await retrieveAllCompanies()
    expect(companies).to.be.an('array')
    expect(companies[0].name).to.equal(companyName);
  })

  it('should return 2 companies with all properties', async () => {
    const companies = await retrieveAllCompanies()
    expect(companies).to.be.an('array')
    expect(companies.length).to.equal(2)

    companies.forEach(company => {
      expect(company).to.have.all.keys('id', 'name', 'registrationdDate', 'emailConfirmation')
    })
  })

  it('should return 3 companies with id and name', async () => {
    const companies = await retrieveAllCompanies({ name: '' })

    expect(companies).to.be.an('array')
    expect(companies.length).to.equal(3)

    companies.forEach(company => {
      expect(company).to.have.all.keys('id', 'name')
      expect(company).to.not.have.any.keys('_id')
    })
  })

  it('should return 4 companies with registrationdDate and name', async () => {
    const companies = await retrieveAllCompanies({ registrationdDate: '', name: '' })
    expect(companies).to.be.an('array')
    expect(companies.length).to.equal(4)

    companies.forEach(company => {
      expect(company).to.have.all.keys('id', 'name', 'registrationdDate')
      expect(company).to.not.have.any.keys('_id')
    })
  })

  it('should return 5 companies without unknown property', async () => {
    const companies = await retrieveAllCompanies({ unknown: '' })

    expect(companies).to.be.an('array')
    expect(companies.length).to.equal(5)

    companies.forEach(company => {
      expect(company).to.not.have.any.keys('_id', 'unknown')
      expect(company).to.have.all.keys('id', 'name', 'registrationdDate', 'emailConfirmation')
    })
  })

  after(async () => {
    await Promise.all([Company.deleteMany(), User.deleteMany()])
    await mongoose.disconnect()
  })
})