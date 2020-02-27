require('dotenv').config()
const atob = require('atob')
const { validate } = require('../utils')
const { users } = require('../data')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process

module.exports = token => {
    validate.string(token, 'token')
    jwt.verify(token, SECRET)

    let [, payload] = token.split('.')
    const sub = JSON.parse(atob(payload)).sub
    validate.string(sub, 'sub')

    let user = users.find(user => sub === user.id)
    if (!user) throw new Error('user has not been retrieved')

    const { name, surname, email } = user
    user = { name, surname, email }

    return Promise.resolve(user)
}