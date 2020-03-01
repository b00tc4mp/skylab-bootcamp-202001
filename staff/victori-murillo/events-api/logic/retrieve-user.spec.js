require('dotenv').config()

const {env: {TEST_MONGODB_URL}} = process
const {database, database: {ObjectId}, models: {User}} = require('../data')
const {expect} = require('chai')
const { random } = Math
const retrieveUser = require('./retrieve-user')

describe('retrieveUser', () => {

  before(() =>
    database.connect(TEST_MONGODB_URL)
    .then(() => users = database.collection('users'))
  )

  let users, name, surname, email, password

  beforeEach(() => {
    name = `name-${random()}`
    surname = `surname-${random()}`
    email = `email-${random()}@mail.com`
    password = `password-${random()}`
  })

  describe('when user already exists', () => {
    let userId

    beforeEach(() => 
        users.insertOne(new User({name, surname, email, password}))
        .then(({insertedId}) => userId = insertedId)
    )

    it('should retrieve the user', () =>
        retrieveUser(userId.toString())
        .then(user => {
            expect(user).to.exist
            expect(user.name).to.equal(name)
            expect(user.surname).to.equal(surname)
            expect(user.email).to.equal(email)
        })
    )

    afterEach(() => users.deleteOne({userId}))

  })


  after(() => database.disconnect())

})