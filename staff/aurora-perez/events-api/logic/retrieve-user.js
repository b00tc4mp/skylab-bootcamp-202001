const { validate } = require('../utils')
const { users } = require('../data')
const jwt = require('jsonwebtoken')
const fs = require('fs').promises
const path = require('path')

const { env: { SECRET } } = process

module.exports = token => {
    validate.string(token, 'token')

    const { sub } = jwt.verify(token, SECRET)

    const user = users.find(user => user.id === sub )

    user.retrieved = new Date

    const {name, surname, email} = user

    return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
    .then(()=> {return {name, surname, email}})
    
}