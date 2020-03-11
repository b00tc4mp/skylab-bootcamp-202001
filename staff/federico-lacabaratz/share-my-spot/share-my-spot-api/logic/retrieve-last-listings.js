const { models: { Listing } } = require('share-my-spot-data')

module.exports = () => {


    return Listing.find().sort({ created: -1 })
        .then(listings => {
            return listings
        })
}