const { validate } = require('simonline-utils')
const { models: { User } } = require('simonline-data')
const { NotAllowedError } = require('simonline-errors')
const bcrypt = require('bcryptjs')

/**
 * Register and save user on database
 * 
 * @param {string} username unique username
 * @param {string} password user's password
 * 
 * @returns {Promise<empty>} empty promise
 * 
 * @throws {NotAllowedError} when username exist
 */

module.exports = (username, password) => {
    validate.string(username, 'username')
    validate.string(password, 'password')

    return User.findOne({ username })
        .then(user => {
            if (user) throw new NotAllowedError(`user with username ${username} already exists`)

            return bcrypt.hash(password, 10)
        })
        .then(password => {
            user = new User({ username, password})

            return user.save()
        })
        .then(() => { })
}