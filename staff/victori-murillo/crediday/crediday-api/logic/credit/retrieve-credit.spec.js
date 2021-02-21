require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, mongoose: { Mongoose: { prototype: { CastError } } } } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const { Company, User, Credit } = require('crediday-models')
const { randomInt } = require('crediday-utils/index')
const retrieveCredit = require('./retrieve-credit')

describe('retrieveCredit', () => {

  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await [Company.deleteMany(), User.deleteMany(), Credit.deleteMany()]
  })

  let companyName, username, email, password, customerName

  beforeEach(() => {
    companyName = (`companyname${random()}`).slice(0, 19)
    username = (`username${random()}`).slice(0, 29)
    email = (`email${random()}@mail.com`)
    password = (`password${random()}`)
    customerName = (`customer-name-${random()}`).slice(0, 29)
  })

  describe('when company, user and credit already exist', () => {
    let company, customer, credit
    let amount, paymentByDefault, paymentAmortize, paymentInterest, balance, paymentDefault, paymentFrecuency

    beforeEach(async () => {
      company = await Company.create({ name: companyName })
      customer = await User.create({ firstName: customerName, company: company._id })

      amount = (`${random()}`).slice(7)
      paymentByDefault = ['cash', 'bn', 'bcr', 'bac'][randomInt(4)]
      paymentAmortize = (`${random()}`).slice(6)
      paymentInterest = (`${random()}`).slice(6)
      balance = (`${random()}`).slice(5)
      paymentDefault = (`${random()}`).slice(5)
      paymentFrecuency = 'weekly'

      credit = await Credit.create({
        amount, paymentByDefault, paymentAmortize, paymentFrecuency,
        paymentInterest, balance, paymentDefault, user: customer.id, company: company.id
      })
    })

    it('should retrieve the credit successfully', async () => {
      const response = await retrieveCredit(credit.id)

      expect(response).to.be.an('object')
    })

    it('should fail with credit id not exists', async () => {
      const randomId = (`${random()}`)

      try {
        await retrieveCredit(randomId)
        throw new Error('should not reach here')

      } catch (error) {
        expect(error).to.instanceOf(CastError)
        expect(error.name).to.equal('CastError')
        expect(error.message).to.equal(`Cast to ObjectId failed for value "${randomId}" at path "_id" for model "Credit"`)
      }
    })

    it('should fail with wrong credit id syntax ', async () => {
      const numberId = 123

      try {
        await retrieveCredit(numberId)
        throw new Error('should not reach here')

      } catch (error) {
        expect(error.message).to.equal(`creditId ${numberId} is not a string`)
      }

    })
  })

  after(() =>
    Promise.all([Company.deleteMany(), User.deleteMany()])
      .then(() => mongoose.disconnect()))
})