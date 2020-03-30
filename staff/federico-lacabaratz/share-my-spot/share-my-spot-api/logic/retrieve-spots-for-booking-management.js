const { models: { User, Spot } } = require('share-my-spot-data')
const { validate } = require('share-my-spot-utils')
const { NotFoundError } = require('share-my-spot-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            return Spot.find({ $and: [{ publisherId: id }, { bookingCandidates: { $exists: true, $ne: [] } }] }).populate("bookingCandidates", "name surname email phone").populate("publisherId", "name surname email phone").lean()
                .then(spots => {
                    if (!spots) throw new NotFoundError(`no spots were found matching your request`)
                    spots.forEach(spot => {
                        spot.id = spot._id.toString()
                        spot.publisherId.id = spot.publisherId._id.toString()
                        spot.bookingCandidates.forEach(bookCandidates => {
                            bookCandidates.id = bookCandidates._id.toString()

                            delete bookCandidates._id
                        })

                        delete spot._id
                        delete spot.__v

                    })

                    return spots
                })
        })
}