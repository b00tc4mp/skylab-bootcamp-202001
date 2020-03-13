const { validate } = require('share-my-spot-utils')
const { models: { Listing } } = require('share-my-spot-data')

module.exports = (userId, body, listingId) => {
    validate.string(userId, 'userId')
    validate.string(listingId, 'listingId')

    return Listing.findOneAndUpdate({ _id: listingId, publisher: userId }, { $set: body })
        .then(() => { })
}