require('dotenv').config()
const { validate } = require('share-my-spot-utils')
const { NotFoundError } = require('share-my-spot-errors')
const { ObjectId, models: { User, Listing } } = require('share-my-spot-data')
const fs = require('fs')
const path = require('path')

/**
* 
* 
* @param {ObjectId} userId of the user
* @param {ObjectId} listingId id of the listing
* @returns {Promise} - data of image  
*/

module.exports = function (listingId) {
    validate.string(listingId, 'listingId')
    
    return (async () => {
        const listing = Listing.findById(listingId)        
        if (!listing) throw new NotFoundError(`listing with id ${listingId} not found`)

        let goTo = path.join(__dirname, `../data/listings/${listingId}/garage01.jpg`)
                try {
            if (fs.existsSync(goTo)) {
                return fs.createReadStream(goTo)
            } else {
                const defaultImage = path.join(__dirname, `../data/defaultimage/avatar.jpg`)
                return fs.createReadStream(defaultImage)
            }
        } catch (error) {
        }

    })()
}