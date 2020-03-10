const { validate } = require('sick-parks-utils')
const { models: { Park, User, Comment } } = require('sick-parks-data')
const { NotFoundError } = require('sick-parks-errors')

module.exports = async ({ userId, parkId }, { body }) => {
    validate.string(userId, 'userId')
    validate.string(parkId, 'parkId')
    validate.string(body, 'body')

    const user = await User.findById(userId)

    if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

    const park = await Park.findById(parkId)

    if (!park) throw new NotFoundError(`park with id ${parkId} does not exist`)

    const comment = await Comment.create({ postedBy: userId, body }) //TODO change to new Comment()???

    park.comments.push(comment)

    await park.save()

    const leanComment = await Comment.findById(comment.id).populate('postedBy', 'name id').lean()

    leanComment.id = leanComment._id.toString()
    leanComment.postedBy.id = leanComment.postedBy._id.toString()

    delete leanComment._id
    delete leanComment.postedBy._id
    delete leanComment.__v

    return leanComment
}