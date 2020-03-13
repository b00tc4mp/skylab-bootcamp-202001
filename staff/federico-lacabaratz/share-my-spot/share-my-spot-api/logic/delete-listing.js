const { validate } = require('share-my-spot-utils')
const { models: { Listing, User } } = require('share-my-spot-data')
const { NotAllowedError } = require('share-my-spot-errors')

module.exports = (userId, listingId) => {
    validate.string(userId, 'userId')
    validate.string(listingId, 'listingId')

    return User.findOne({ _id: userId, publishedListings: listingId })
    .then(correct => {
            if (correct) {
                return User.find({ publishedListings: listingId })
            }
            else {
                throw new NotAllowedError('This user cannot delete this listing')
            }
        })
        .then(usersArray => {
            return usersArray.forEach(async user => await User.findByIdAndUpdate(user.id, { $pull: { publishedListings: listingId } }))
        })
        .then(() => Listing.findByIdAndRemove(listingId))
        .then(() => { })
}