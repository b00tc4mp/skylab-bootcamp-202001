require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose } = require('crediday-models')
const { expect } = require('chai')
const { random } = Math
const registerUser = require('./register-user')
const registerCompany = require('../company/register-company')
const { Company, User } = require('crediday-models')
const { ContentError } = require('crediday-errors')

describe('registerUser', () => {
  before(async () => {
    await mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    await [Company.deleteMany(), User.deleteMany()]
  })

  let companyName, username

  beforeEach(() => {
    companyName = (`companyname-${random()}`).slice(0, 19)
    username = (`username-${random()}`).slice(0, 29)
  })

  describe('when company and owner already exist', () => {
    let firstName
    let companyId

    beforeEach(async () => {
      const company = await registerCompany({ companyName, username })
      companyId = company.id
      firstName = (`firstName-${random()}`).slice(0, 29)
    })

    it('register user successfully', () =>
      registerUser(companyId, { firstName })
        .then(response => {
          expect(response).to.be.an('undefined')
        })
        .then(async () => {
          const user = await User.findOne({ firstName })
          expect(user.firstName).to.equal(firstName)
        })
    )


  })





})