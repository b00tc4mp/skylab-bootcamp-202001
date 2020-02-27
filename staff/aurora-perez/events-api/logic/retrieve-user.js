// TODO user.retrieved = new Date
const { validate } = require('../utils')
const { users } = require('../data')
const jwt = require('jsonwebtoken')
const atob = require('atob')

const fs = require('fs').promises
const path = require('path')

const { env: { SECRET } } = process

module.exports = token => {
    validate.string(token, 'token')
    debugger

    const [header, payload, signature] = token.split('.')

    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    //if (!sub) throw new Error('no user id in token')
    //sub = user.id 

    const user = users.find(user => user.id === sub )

    user.retrieved = new Date

    const {name, surname, email} = user
   // {username, name, email} = user //TODO
    return {name, surname, email}
}