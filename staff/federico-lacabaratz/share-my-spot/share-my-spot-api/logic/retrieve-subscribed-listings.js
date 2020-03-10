const { validate } = require('listings-utils')
const { models: { listing } } = require('listings-data')

module.exports = (userId) => {
    validate.string(userId, 'userId')

    return listing.find({ usersSubscribed: userId})
        .then(listing => {
            return listing
        })
}