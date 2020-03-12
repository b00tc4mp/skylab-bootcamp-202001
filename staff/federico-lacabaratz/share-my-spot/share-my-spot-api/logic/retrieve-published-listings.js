const { models: { User, Listing } } = require('share-my-spot-data')
const { validate } = require('share-my-spot-utils')
const { NotFoundError } = require('share-my-spot-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} not found`)
            
            return Listing.find({ publisher: id, created: { $lte: new Date } })
                .lean()
                .then(listings => {
                    listings.forEach(listing => {
                        listing.id = listing._id.toString()

                        delete listing._id

                        listing.publisher = listing.publisher.toString()
                    })

                    return listings
                })
        })
        
}