const { validate } = require('listings-utils')
const { models: { listing } } = require('listings-data')

module.exports = (userId, body, listingId) => {
    validate.string(userId, 'userId')
    validate.string(listingId, 'listingId')

    return listing.findOneAndUpdate({ _id: listingId, publisher: userId }, { $set: body })
        .then(() => { })
}