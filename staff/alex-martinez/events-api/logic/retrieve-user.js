// TODO user.retrieved = new Date
const atob = require('atob')
const users = require('../data/index')

module.exports = (token) => {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no user id in token')

    const retrieve = users.find(user => user.id === sub)

    if(retrieve) {
        
    }

}