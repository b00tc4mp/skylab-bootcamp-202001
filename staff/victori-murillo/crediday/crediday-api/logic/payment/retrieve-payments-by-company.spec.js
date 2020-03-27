require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, mongoose: { Mongoose: { prototype: { CastError } } } } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const { Company, User, Credit, Payment } = require('crediday-models')
const { randomInt } = require('crediday-utils/index')
const { registerCredit } = require('..')
const registerPayment = require('./register-payment')
const retrievePaymentsByCompany = require('./retrieve-payments-by-company')

describe('retrievePaymentsByCompany', () => {

  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await [Company.deleteMany(), User.deleteMany(), Credit.deleteMany()]
  })

  let companyName, username, email, password, customerName
  let amount, interest, amortize, moratorium, paymentBy

  beforeEach(() => {
    companyName = (`companyname${random()}`).slice(0, 19)
    username = (`username${random()}`).slice(0, 29)
    email = (`email${random()}@mail.com`)
    password = (`password${random()}`)
    customerName = (`customer-name-${random()}`).slice(0, 29)

    amount = 100000
    interest = 5000
    amortize = 10000
    moratorium = 3000
    paymentBy = 'cash'
  })

  describe('when company and user already exist', () => {
    let company, customer, creditId, paymentId
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

      creditId = await registerCredit(customer.id, {
        amount, paymentByDefault, paymentAmortize, paymentInterest, balance, paymentDefault, paymentFrecuency
      })

      paymentId = await registerPayment({
        creditId, body: {
          amount, paymentByDefault, amortize, moratorium, interest, paymentDefault,
          paymentFrecuency, paymentBy,
          company: company._id
        }
      })
    })

    it('should retrieve payments', async () => {
      const payments = await retrievePaymentsByCompany(customer.id)

      expect(payments).to.be.an('array')
      expect(payments[0].id).to.equal(paymentId)
    })

    it('should fail with wrong user Id', async () => {
      const wrongId = customer.id + '-wrong'

      try {
        await retrievePaymentsByCompany(wrongId)
        throw new Error('should not reach here')

      } catch (error) {
        expect(error.message).to.equal(`Cast to ObjectId failed for value "${wrongId}" at path "_id" for model "User"`)
      }
    })

    it('should fail with not a string', async () => {
      const userId = 123

      try {
        await retrievePaymentsByCompany(userId)
        throw new Error('should not reach here')

      } catch (error) {
        expect(error.message).to.equal(`userId ${userId} is not a string`)
      }
    })
  })

  after(() =>
    Promise.all([Company.deleteMany(), User.deleteMany()])
      .then(() => mongoose.disconnect()))
})