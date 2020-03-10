const { models: { listing } } = require('listings-data')

module.exports = () => {


    return listing.find().sort({ created: -1 })
        .then(listings => {
            return listings
        })
}