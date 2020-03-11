const { validate } = require('share-my-spot-utils')
const { models: { User, Listing } } = require('share-my-spot-data')


module.exports = (userId, listingId) => {
    validate.string(userId, 'userId')
    validate.string(listingId, 'listingId')


    return User.findOne({ _id: userId, subscribedTolisting: listingId})
        .then(user => {

            if (user) throw new Error('user is already subscribed to this listing')
        })
        .then(() => {
            return User.updateOne({ _id: userId }, { $push: { subscribedToListing: listingId } })
        })
        .then(() => {
            return Listing.updateOne({ _id: listingId }, { $push: { usersSubscribed: userId } })
                .then(() => { })
        })
}