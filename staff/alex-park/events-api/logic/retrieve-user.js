require('dotenv').config()
const atob = require('atob')
const { validate } = require('../utils')
const { users } = require('../data')
const fs = require('fs').promises
const path = require('path')

module.exports = token => {
    validate.string(token, 'token')

    let [, payload] = token.split('.')
    const sub = JSON.parse(atob(payload)).sub
    validate.string(sub, 'sub')

    let user = users.find(user => sub === user.id)
    if (!user) throw new Error('user has not been retrieved')

    const { name, surname, email } = user
    user = { name, surname, email }

    return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
    .then(() => user)
}