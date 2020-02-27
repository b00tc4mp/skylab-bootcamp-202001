const {validate} = require('../utils')
const {users} = require('../data')

const fs = require('fs').promises
const path = require('path')
const jwt = require('jsonwebtoken')

const { env: { JWT_SECRET, JWT_EXP } } = process

module.exports = (email, password) => {
  validate.string(email, 'email')
  validate.email(email)
  validate.string(password, 'password')
  
  const user = users.find(user => user.email === email && user.password === password)

  if (!user) throw new Error('wrong credentials')

  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: JWT_EXP})

  user.authenticated = new Date

  return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 2))
    .then(() => token)
}