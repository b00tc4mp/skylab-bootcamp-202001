require('dotenv').config()

const {expect} = require('chai')
const {ObjectId} = require('mongodb')
const {registerUser} = require('.')
const {database} = require('../data')
const {env: {MONGODB_URL}} = process
 
describe('registerUser', () => {

  let name, surname, email, password, users

  before(() => 
    database.connect(MONGODB_URL)
    .then(() => users = database.collection('users'))
  )

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
      return users.findOne({email})
    })
    .then(user => {
      expect(user).to.exist
      expect(user._id).to.be.instanceOf(ObjectId)
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
      .then(() => {throw new Error('should not reach this point')})
      .catch(error => {
          expect(error).to.be.instanceOf(Error)
          expect(error.message).to.equal(`user with email ${email} already exists`)
      })
  })
  })

  afterEach(() => users.deleteOne({email}))


})