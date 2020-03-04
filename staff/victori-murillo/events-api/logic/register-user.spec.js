require('dotenv').config()

const { expect } = require('chai')
// const { ObjectId } = require('mongodb')
const registerUser = require('./register-user')
const { env: { TEST_MONGODB_URL } } = process
const { User } = require('../models')
const mongoose = require('mongoose')

describe('registerUser', () => {

  let name, surname, email, password

  before(() => mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }))

  beforeEach(() => {
    name = 'name-' + Math.random(),
    surname = 'surname-' + Math.random(),
    email = Math.random() + '@mail.com',
    password = 'password-' + Math.random()
  })

  it('should succed on new user', () =>
    registerUser(name, surname, email, password)
      .then(result => {
        expect(result).not.to.exist
        expect(result).to.be.undefined
        return User.findOne({ email })
      })
      .then(user => {
        debugger
        expect(user).to.exist
        expect(user.id).to.be.a('string')
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)
        expect(user.created).to.be.instanceOf(Date)
      })
  )

  describe('when user already exists', () => {
    beforeEach(() => registerUser(name, surname, email, password))

    it('should fail on already existing user', () => {
      registerUser(name, surname, email, password)
        .then(() => { throw new Error('should not reach this point') })
        .catch(error => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.equal(`user with email ${email} already exists`)
        })
    })
  })

  afterEach(() => User.deleteOne({ email }))


})