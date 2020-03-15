const { validate } = require('share-my-spot-utils')
const { models: { Listing, Booking, User } } = require('share-my-spot-data')
const { NotAllowedError } = require('share-my-spot-errors')

module.exports = (userId, listingId, bookingId) => {
    validate.string(userId, 'userId')
    validate.string(bookingId, 'bookingId')
    validate.string(listingId, 'listingId')

    return User.findOne({ _id: userId, bookings: bookingId })
        .then((correct) => {
            if (correct) {
                return User.find({ bookings: bookingId })
            }
            else {
                throw new NotAllowedError('This user cannot delete this booking')
            }
        })
        .then(usersArray => {
            return usersArray.forEach(async user => await User.findByIdAndUpdate(user.id, { $pull: { bookings: bookingId } }), Listing.findByIdAndUpdate(listing.id, { $pull: { bookings: bookingId } }))
        })
        .then(() => Booking.findByIdAndRemove(bookingId))
        .then(() => { })
}