const { validate } = require('../utils')
const { database }  = require('../data')
const { NotAllowError } = require('../errors')

module.exports = (name, surname, email, password) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    const users = database.collection('users')

    return users.findOne({ email })
        .then(user => {
            if (user) throw new NotAllowError(`user with email ${email} already exists`)

            user = {name, surname, email, password, date: new Date}

            return users.insertOne(user)
        })
        .then(() => { })
}