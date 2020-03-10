const { validate } = require('listings-utils')
const { models: { User, listing } } = require('listings-data')


module.exports = (userId, listingId) => {
    validate.string(userId, 'userId')
    validate.string(listingId, 'listingId')


    return User.findOne({ _id: userId, subscribedTolisting: listingId})
        .then(user => {

            if (user) throw new Error('user is already subscribed to this listing')
        })
        .then(() => {
            return User.updateOne({ _id: userId }, { $push: { subscribedTolisting: listingId } })
        })
        .then(() => {
            return listing.updateOne({ _id: listingId }, { $push: { usersSubscribed: userId } })
                .then(() => { })
        })
}