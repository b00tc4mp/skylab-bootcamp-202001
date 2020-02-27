const {expect} = require('chai')
const {registerUser} = require('.')
const {users} = require('../data')
const fs = require('fs').promises
const path = require('path')

describe('registerUser', () => {

  let name, surname, email, password

  beforeEach(() => {
    name = 'name-' + Math.random(),
    surname = 'surname-' + Math.random(),
    email = Math.random() + '@mail.com',
    password = 'password-' + Math.random()
  })

  it('should succed on new user', () => {
    registerUser(name, surname, email, password)
    .then(response => expect(response).to.be.an('undefined'))
  })

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