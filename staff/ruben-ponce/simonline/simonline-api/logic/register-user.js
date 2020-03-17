const { validate } = require('simonline-utils')
const { models: { User } } = require('simonline-data')
const { NotAllowedError } = require('simonline-errors')
const bcrypt = require('bcryptjs')

module.exports = (username, password) => {
    validate.string(username, 'username')
    validate.string(password, 'password')
    return User.findOne({ username })
        .then(user => {
            debugger
            if (user) throw new NotAllowedError(`user with username ${username} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(password => {
            user = new User({ username, password})

            return user.save()
        })
        .then(() => { })
}