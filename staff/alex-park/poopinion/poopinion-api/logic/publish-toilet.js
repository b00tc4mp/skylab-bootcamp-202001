const { validate } = require('poopinion-utils')
const { models: { User, Toilet } } = require('poopinion-data')
const { NotAllowedError, NotFoundError } = require('poopinion-errors')

/**
 * Publish a new toilet post
 * 
 * @param {string} id user's unique id
 * @param {string} place location of the toilet
 * 
 * @returns {Promise<string>} returns an empty Promise
 * 
 * @throws {NotAllowedError} if the user exists but has the property 'deactivated' as true
 * @throws {NotFoundError} if the user does not exist
 */
module.exports = (id, place) => {
    validate.string(id, 'id')
    validate.string(place, 'place')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)
            if (user.deactivated) throw new NotAllowedError(`user with id ${id} is deactivated`)

            const toilet = new Toilet({ place, created: new Date, publisher: id, geolocation: [50, 50] })

            user.publishedToilets.push(toilet)
            return Promise.all([user.save(), toilet.save()])
        })
        .then(([, toilet]) => {
            toilet.id = toilet._id.toString()
            delete toilet._id

            return toilet.save()
        })
        .then(() => { })
}