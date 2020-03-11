const { validate } = require('share-my-spot-utils')
const { models: { Listing, User } } = require('share-my-spot-data')

module.exports = (userId, listingId) => {
    validate.string(userId, 'userId')
    validate.string(listingId, 'listingId')

    return Listing.deleteOne({ _id: listingId, publisher: userId })

        // .then(() => {
        //     return User.update({ $pull: { subscribedToListing: listingId } })
        // })
        // .then(() => {
        //     return User.update({ $pull: { publishedListing: listingId } })
        //     //     // const userToModify = User.find({subscribedToListing: listingId})

        //     //     // userToModify.filter(result => result !== User.find({subscribedToListing: listingId})
        // })
        .then(() => { })
}