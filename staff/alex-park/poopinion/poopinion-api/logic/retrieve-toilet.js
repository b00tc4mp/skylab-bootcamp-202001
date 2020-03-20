const { validate } = require('poopinion-utils')
const { models: { Toilet } } = require('poopinion-data')
const { NotFoundError } = require('poopinion-errors')

/**
 * Retrieves all toilet posts that matches the specified query criteria
 * 
 * @param {string} toiletId toilet's unique id
 * 
 * @returns {Object} returns an object with all the specific info of that toilet
 * @throws {NotFoundError} if the user does not exist
 */
module.exports = toiletId => {
    validate.string(toiletId, 'toilet ID')

    return Toilet.findById(toiletId).populate('publisher', 'name surname email age gender').populate('comments').populate({path:'comments', populate: {path:'publisher'}}).lean()
        .then(toilet => {
            if (!toilet) throw new NotFoundError(`toilet with id ${toiletId} does not exist`)
            toilet.id = toilet._id.toString()
            delete toilet._id
            delete toilet.__v

            toilet.publisher.id = toilet.publisher._id.toString()
            delete toilet.publisher._id

            toilet.comments.forEach(comment => {
                comment.id = comment._id.toString()
                delete comment._id
                delete comment.__v
            })

            return toilet
        })
}