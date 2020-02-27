// const { validate } = require('../utils')
// const { users } = require('../data')
// const fs = require('fs').promises
// const path = require('path')
// const { env: { SECRET } } = process
// const atob = require('atob')

// module.exports = (token, name, surname, email) => {
    
//     validate.string(token, 'token')
//     validate.string(name, 'name')
//     validate.string(surname, 'surname')
//     validate.string(email, 'email') 
// }

// if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)
//     const [header, payload, signature] = token.split('.')
//     if (!header || !payload || !signature) throw new Error('invalid token')

//     const { id } = JSON(atob(payload))

//     return id




// TODO user.retrieved = new Date