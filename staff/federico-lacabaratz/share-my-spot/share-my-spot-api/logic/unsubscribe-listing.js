const { validate } = require('listings-utils')
const { models: { listing, User } } = require('listings-data')

module.exports = (userId, listingId) => {
    validate.string(userId, 'userId')
    validate.string(listingId, 'listingId')

    return listing.deleteOne({ _id: listingId, publisher: userId })

        // .then(() => {
        //     return User.update({ $pull: { subscribedTolisting: listingId } })
        // })
        // .then(() => {
        //     return User.update({ $pull: { publishedlistings: listingId } })
        //     //     // const userToModify = User.find({subscribedTolisting: listingId})

        //     //     // userToModify.filter(result => result !== User.find({subscribedTolisting: listingId})
        // })
        .then(() => { })
}