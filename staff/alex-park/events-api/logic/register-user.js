const { validate } = require('../utils')
const { users } = require('../data')
const fs = require('fs').promises
const path = require('path')
const { v4: uuid } = require('uuid')
const { MongoClient } = require('mongodb')

const client = new MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true })

client.connect()
.then(() => {
    const db = client.db('events')
    const users = db.collection('users')

    
})


module.exports = (name, surname, email, password) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    let user = users.find(user => user.email === email)

    if (user) throw new Error(`user with email ${email} already exists`)

    user = { id: uuid(), name, surname, email, password, created: new Date }

    users.push(user)

    return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
}