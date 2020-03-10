const { validate } = require('poopinion-utils')
const { models: { User } } = require('poopinion-data')
const { NotAllowedError, NotFoundError } = require('poopinion-errors')

/**
 * Finds and receives data from a desired user
 * 
 * @param {string} id user's unique id
 * 
 * @returns {Promise<string>} user's name, surname, email, age and gender from storage
 * 
 * @throws {NotAllowedError} if the user exists but has the property 'deactivated' as true
 * @throws {NotFoundError} if the user does not exist
 */
module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            user.retrieved = new Date
            user.id = user._id.toString()
            delete user._id

            return user.save()
        })
        .then(({ name, surname, email, age, gender }) => ({ name, surname, email, age, gender }))
}