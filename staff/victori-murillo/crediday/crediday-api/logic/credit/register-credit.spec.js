require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, mongoose: { Mongoose: { prototype: { CastError } } } } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const { Company, User, Credit } = require('crediday-models')
const { randomInt } = require('crediday-utils/index')
const registerCredit = require('./register-credit')

describe('registerCredit', () => {

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

  describe('when company and user already exist', () => {
    let company, customer
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
    })

    it('should create a new credit', async () => {
      const response = await registerCredit(customer.id, {
        amount, paymentByDefault, paymentAmortize, paymentInterest, balance, paymentDefault, paymentFrecuency,
        company: company._id
      })

      expect(response).to.be.a('string')
    })

    it('should fail with wrong id customer', async () => {
      const wrongId = customer.id + '-wrong'
      try {
        await registerCredit(wrongId, {
          amount, paymentByDefault, paymentAmortize, paymentInterest, balance, paymentDefault,
          paymentFrecuency
        })

        throw new Error('should not reach here')
      } catch (error) {
        expect(error.message).to.equal(`Cast to ObjectId failed for value "${wrongId}" at path "_id" for model "User"`)
      }

    })

    it('should fail with not a string', async () => {
      const userId = 123

      try {
        await registerCredit(userId, {
          amount, paymentByDefault, paymentAmortize, paymentInterest, balance,
          paymentDefault, paymentFrecuency,
        })

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