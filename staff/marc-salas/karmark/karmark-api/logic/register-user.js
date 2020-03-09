const { validate } = require('karmark-utils')
const { models: { User } } = require('karmark-data')
const { NotAllowedError } = require('karmark-errors')
const bcrypt = require('bcryptjs')

module.exports = (name, surname, username, password) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(username, 'username')
    validate.string(password, 'password')

    return User.findOne({ username })
        .then(user => {
            if (user) throw new NotAllowedError(`user with username ${username} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(password => {
            user = new User({ name, surname, username, password, created: new Date })

            return user.save()
        })
        .then(() => { })
}
