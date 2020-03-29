const { validate } = require('sick-parks-utils')
const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { models: { User } } = require('sick-parks-data')

/**
 * Retrieves the requested user from the storage
 * 
 * @param {object} payload the token's payload
 * @param {string} payload.sub the user's unique id
 
 * 
 * @returns {Object} user data
 * 
 * @throws {ContentError} if params don't follow the format and content rules
 * @throws {TypeError} if user id does not have the correct type
 * @throws {NotFoundError} when the provided user id does not match any user
 * @throws {NotAllowedError} when the provided user id belongs to a deactivated user
 */


module.exports = ({ sub: id }) => {
    validate.string(id, 'id')
    // Will need to change it to alson receive id through params if need to go to other user profile
    return User.findById(id)
        .then(user => {

            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            user.retrieved = new Date
            user.id = user._id.toString()

            return user.save()
        })
        .then(({ id, name, surname, email, contributions, image, allowLocation, notifications }) => ({ id, name, surname, email, contributions, image, allowLocation, notifications }))
}