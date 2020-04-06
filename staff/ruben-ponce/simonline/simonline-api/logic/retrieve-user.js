const { validate } = require('simonline-utils')
const { models: { User } } = require('simonline-data')
const { NotFoundError } = require('simonline-errors')

/**
 * Retrieve username from database with id
 * 
 * @param {string} id of player
 * 
 * @returns {Promise<String>} username
 * 
 * @throws {NotAllowedError} when not found user
 */

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            user.retrieved = new Date

            return user.save()
        })
        .then(({ username }) => ({ username }))
}