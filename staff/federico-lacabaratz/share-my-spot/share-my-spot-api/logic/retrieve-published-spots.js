const { models: { User, Spot } } = require('share-my-spot-data')
const { validate } = require('share-my-spot-utils')
const { NotFoundError } = require('share-my-spot-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            return Spot.find({ publisherId: id, created: { $lte: new Date } }).populate("publisherId", "name surname email phone")
                .lean()
                .then(spots => {
                    spots.forEach(spot => {
                        spot.id = spot._id.toString()
                        spot.publisherId.id = spot.publisherId._id.toString()

                        delete spot._id
                        delete spot.__v
                        
                    })
                    return spots
                })
        }) 
}