const { users } = require('../data')
const fs = require('fs').promises
const path = require('path')
const { validate } = require('../utils')


module.exports = (tokenSub) => {
    validate.string(tokenSub, 'token sub')
    const user = users.find(user => user.id === tokenSub)

    if (!user) throw new Error('invalid token')

    user.retrieved = new Date

    const { name, surname, email } = user

    return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
        .then(() => { return { name, surname, email } })
}