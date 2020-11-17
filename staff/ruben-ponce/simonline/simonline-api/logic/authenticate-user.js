const { validate } = require('simonline-utils')
const { models: { User } } = require('simonline-data')
const { NotAllowedError } = require('simonline-errors')
const bcrypt = require('bcryptjs')

/**
 * Checks user credentials against the storage
 * 
 * @param {string} username unique username
 * @param {string} password user's password
 * 
 * @returns {Promise<string>} user id from db
 * 
 * @throws {NotAllowedError} on wrong credentials
 */

module.exports = (username, password) => {
    validate.string(username, 'username')
    validate.string(password, 'password')

    return User.findOne({ username })
        .then(user => {
            if (!user) throw new NotAllowedError(`wrong credentials`)

            return bcrypt.compare(password, user.password)
                .then(validPassword => {
                    if (!validPassword) throw new NotAllowedError(`wrong credentials`)

                    return user.save()
                })
                .then(({ id }) => id)
        })
}