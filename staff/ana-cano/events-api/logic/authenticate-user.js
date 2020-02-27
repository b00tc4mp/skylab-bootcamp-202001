const { validate } = require('../utils') // validar si es string... happy path
const { users } = require('../data') 
const jwt = require('jsonwebtoken') //crear token aleatorio

const fs = require('fs').promises //crear fichero y transformarlo en promesa
const path = require('path') //crear ruta

const { env: { SECRET } } = process

module.exports = (email, password) => {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    const user = users.find(user => user.email === email && user.password === password)

    if (!user) throw new Error(`wrong credentials`)

    const token = jwt.sign({ sub: user.id }, SECRET, { expiresIn: '1h' })

    user.authenticated = new Date

    return fs.writeFile(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 4))
        .then(() => token) // Crear el fichero 
}