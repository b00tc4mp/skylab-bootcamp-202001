const { models: { listing } } = require('listings-data')
const { validate } = require('listings-utils')
const { NotFoundError } = require('listings-errors')

module.exports = id => {
    validate.string(id, 'id')

    return listing.find({ publisher: id })
        .then(listing => {
            if (!listing) throw new NotFoundError(`listing with id ${id} does not exist`)
            
            return listing
        })
        
}