const { validate } = require('../utils')
const {users} = require('../data')
const fs = require('fs').promises
const path = require('path')

module.exports = (id) => {
    
    validate.string(id, 'id')
    
    const user = users.find(user => user.id === id)
    
    const {name, surname, email} = user
    return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
    .then(() => { return {name, surname, email}})
}