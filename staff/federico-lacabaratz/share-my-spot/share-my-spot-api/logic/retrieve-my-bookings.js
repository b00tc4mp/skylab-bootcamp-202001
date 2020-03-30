const { models: { User, Spot } } = require('share-my-spot-data')
const { validate } = require('share-my-spot-utils')
const { NotFoundError } = require('share-my-spot-errors')

module.exports = id => {
    validate.string(id, 'id')

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const spots = await Spot.find({$or:[ {'bookingCandidates': id}, {'bookedTo': id} ]}).populate("publisherId", "name surname email phone")
        .lean()

        spots.forEach(spot => {
            spot.id = spot._id.toString()

            delete spot._id
            delete spot.__v

        })

        return spots

    })()
}