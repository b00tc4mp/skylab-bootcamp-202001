const {users} = require('../data')
const atob = require('atob')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process

module.exports = token => {
  jwt.verify(token, SECRET)

  let [,payload] = token.split('.')
  let id = JSON.parse(atob(payload)).sub
  
  let user = users.find(user => user.id === id)

  if (!user) throw new Error('you have been deleted')
  
  return Promise.resolve({name: user.name, surname: user.surname, email: user.email})
}