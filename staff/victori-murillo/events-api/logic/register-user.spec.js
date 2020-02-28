const {expect} = require('chai')
const {registerUser} = require('.')
const fs = require('fs').promises
const path = require('path')
const {MongoClient, ObjectID} = require('mongodb')

describe('registerUser', () => {

  let name, surname, email, password, users

  before(() => {
    const client = new MongoClient('http://localhost:27017', { useUnifiedTopology: true });

    return  client.connect()
      .then(() => {
        const db = client.db('events')
        const users = db.collection('users')
      })
  })

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
      return findOne({email})
    })
    .then(user => {
      expect(user).to.exist
      expect(user).to.be.instanceOf(ObjectID)
      expect(user.name).to.equal(name)
      expect(user.surname).to.equal(surname)
      expect(user.email).to.equal(email)
      expect(user.password).to.equal(password)
    })
  )

  describe('when user already exists', () => {
    beforeEach(() => {
      user = {id: uuid(), name, surname, email, password, created: new Date}
      users.push(user)
      return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2))
    })
  })

  afterEach(() => {
    console.log(users)
    let index = users.findIndex(user => user.email === email)
    users.splice(index, 1)
    // users.splice(users.indexOf(), 1)
    return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2))
  })


})