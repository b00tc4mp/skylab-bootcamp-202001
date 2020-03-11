const { models: { Listing } } = require('share-my-spot-data')
const { validate } = require('share-my-spot-utils')
const { NotFoundError } = require('share-my-spot-errors')

module.exports = id => {
    validate.string(id, 'id')

    return Listing.find({ publisher: id })
        .then(listing => {
            if (!listing) throw new NotFoundError(`listing with id ${id} does not exist`)
            
            return listing
        })
        
}