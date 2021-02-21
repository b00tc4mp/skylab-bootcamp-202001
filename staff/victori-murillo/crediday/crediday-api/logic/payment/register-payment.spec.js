require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, mongoose: { Mongoose: { prototype: { CastError } } } } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const { Company, User, Credit, Payment } = require('crediday-models')
const { randomInt } = require('crediday-utils/index')
const { registerCredit } = require('..')
const registerPayment = require('./register-payment')

describe('registerPayment', () => {

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
    let company, customer, creditId
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
    })

    it('should create a new payment', async () => {
      const response = await registerPayment({
        creditId, body: {
          amount, paymentByDefault, amortize, moratorium, interest, paymentDefault,
          paymentFrecuency, paymentBy
        }
      })

      expect(response).to.be.a('string')
      const payment = await Payment.findOne({ credit: creditId })
      expect(payment).to.be.an('object')
      expect(payment.paymentBy).to.equal(paymentBy)
    })

    it('should fail with wrong id credit', async () => {
      const wrongId = customer.id + '-wrong'

      try {
        await registerPayment({
          creditId: wrongId, body: {
            amount, paymentByDefault, amortize, moratorium, interest, paymentDefault,
            paymentFrecuency, paymentBy
          }
        })

        throw new Error('should not reach here')
      } catch (error) {
        expect(error.message).to.equal(`Cast to ObjectId failed for value "${wrongId}" at path "_id" for model "Credit"`)
      }

    })

    it('should fail with not a string', async () => {
      const creditId = 123

      try {
        await registerPayment({
          creditId, body: {
            amount, paymentByDefault, amortize, moratorium, interest, paymentDefault,
            paymentFrecuency, paymentBy
          }
        })

        throw new Error('should not reach here')
      } catch (error) {
        expect(error.message).to.equal(`creditId ${creditId} is not a string`)
      }
    })
  })

  after(() =>
    Promise.all([Company.deleteMany(), User.deleteMany()])
      .then(() => mongoose.disconnect()))
})