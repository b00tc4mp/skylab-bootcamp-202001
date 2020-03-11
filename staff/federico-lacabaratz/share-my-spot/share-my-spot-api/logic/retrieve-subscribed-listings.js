const { validate } = require('share-my-spot-utils')
const { models: { Listing } } = require('share-my-spot-data')

module.exports = (userId) => {
    validate.string(userId, 'userId')

    return Listing.find({ usersSubscribed: userId})
        .then(listing => {
            return listing
        })
}