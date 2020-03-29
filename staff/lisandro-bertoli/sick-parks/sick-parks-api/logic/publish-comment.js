const { validate } = require('sick-parks-utils')
const { models: { Park, User, Comment } } = require('sick-parks-data')
const { NotFoundError } = require('sick-parks-errors')

/**
 * Embeds a new comment into the park comments Array
 * 
 * @param {string} userId user's unique id
 * @param {string} parkId park's unique id
 * @param {object} req.body the request body containing the comment
 * @param {string} req.body.body the comment body itself
 * 
 * @returns {undefined}
 * 
 * @throws {ContentError} if params don't follow the format and content rules
 * @throws {TypeError} if userId, parkId or body.body do not have the correct type
 * @throws {NotFoundError} when the provided userId or parkId do not match document
 */


module.exports = (userId, parkId, { body }) => {
    validate.string(userId, 'userId')
    validate.string(parkId, 'parkId')
    validate.string(body, 'body')

    return (async () => {


        const user = await User.findById(userId)

        if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

        const park = await Park.findById(parkId)

        if (!park) throw new NotFoundError(`park with id ${parkId} does not exist`)

        const comment = new Comment({ postedBy: user, body })
        park.comments.push(comment)

        await park.save()

        return

    })()
}