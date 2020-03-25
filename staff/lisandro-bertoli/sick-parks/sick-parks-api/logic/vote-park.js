const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { models: { Park, User } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')

module.exports = (userId, { id: parkId }, vote) => {
    validate.string(userId, 'userId')
    validate.string(parkId, 'parkId')
    validate.type(vote, 'vote', Boolean)

    return (() => {

        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

        const park = await Park.findById(parkId)
        if (!park) throw new NotFoundError(`park with id ${parkId} does not exist`)

        if (vote) {
            if (park.upVotes.includes(user._id)) throw new NotAllowedError(`user with id ${userId} already upVoted`)

            park.upVotes.push(user._id)
        } else {
            if (park.dowVotes.includes(user._id)) throw new NotAllowedError(`user with id ${userId} already downVoted`)

            park.dowVotes.push(user._id)
        }

        park.rating = park.upVotes.length - park.downVotes.length

        await park.save()

        return
    })

}