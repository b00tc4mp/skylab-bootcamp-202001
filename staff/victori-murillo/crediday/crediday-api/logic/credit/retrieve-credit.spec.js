require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, mongoose: { Mongoose: { prototype: { CastError } } } } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const { Company, User, Credit } = require('crediday-models')
const { ContentError } = require('crediday-errors')
const { randomInt } = require('crediday-utils/index')
const registerCredit = require('./register-credit')

describe('retrieveCredit', () => {

  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await [Company.deleteMany(), User.deleteMany(), Credit.deleteMany()]
  })

  let companyName, username, customerName

  beforeEach(() => {
    companyName = (`companyname${random()}`).slice(0, 19)
    username = (`username${random()}`).slice(0, 29)
    customerName = (`customer-name-${random()}`).slice(0, 29)
  })

  describe('when company, user and credit already exist', () => {
    let company, customer
    let amount, paymentByDefault, paymentAmortize, paymentInterest, balance, paymentDefault

    beforeEach(async () => {
      company = await Company.create({ name: companyName })
      customer = await User.create({ firstName: customerName, company: company._id })

      amount = (`${random()}`).slice(7)
      paymentByDefault = ['cash', 'bn', 'bcr', 'bac'][randomInt(4)]
      paymentAmortize = (`${random()}`).slice(6)
      paymentInterest = (`${random()}`).slice(6)
      balance = (`${random()}`).slice(5)
      paymentDefault = (`${random()}`).slice(5)
    })

    it('should retrieve the credit', () => {
      return registerCredit(customer.id, {
        amount, paymentByDefault, paymentAmortize, paymentInterest, balance, paymentDefault,
        company: company._id
      })
        .then(result => {
          expect(result).to.be.an('undefined')
        })
    })

    it('should fail with company id not exists', () => {
      return registerCredit(customer.id, {
        amount, paymentByDefault, paymentAmortize, paymentInterest, balance, paymentDefault,
        company: `5e69fd9bbd0d13e702136fc8`
      })
        .then(() => { throw new Error('should not reach here') })
        .catch(error => {
          expect(error).to.instanceOf(Error)
          expect(error.message).to.equal('Company doesnt exist')
        })
    })

    it('should fail with wrong syntax of company id ', () => {
      const companyId = `${random()}`

      return registerCredit(customer.id, {
        amount, paymentByDefault, paymentAmortize, paymentInterest, balance, paymentDefault,
        company: companyId
      })
        .then(() => { throw new Error('should not reach here') })
        .catch(error => {
          expect(error).to.instanceOf(CastError)
          expect(error.name).to.equal('CastError')
          expect(error.message).to.equal(`Cast to ObjectId failed for value "${companyId}" at path "_id" for model "Company"`)
        })
    })
  })
})