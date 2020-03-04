require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('./retrieve-user')
const { User } = require('../models')
const mongoose = require('mongoose')

describe('retrieveUser', () => {

  before(() => mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }))

  let name, surname, email, password

  beforeEach(() => {
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
  })

  describe('when user already exists', () => {
    let _id

    beforeEach(() =>
      User.create(({ name, surname, email, password }))
        .then(({ id }) => _id = id)
    )

    it('should retrieve the user', () =>
      retrieveUser(_id)
        .then(user => {
          expect(user).to.exist
          expect(user.name).to.equal(name)
          expect(user.surname).to.equal(surname)
          expect(user.email).to.equal(email)
        })
    )
    afterEach(() => User.deleteOne({ _id }))

  })
  after(() => mongoose.disconnect())
})