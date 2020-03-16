const { validate } = require('../../share-my-spot-utils')
const { models: { User, Booking, Listing } } = require('../../share-my-spot-data')
const { NotFoundError, NotAllowedError } = require('../../share-my-spot-errors')

module.exports = (userToBook, publisher, listingId, dateStarts, dateEnds, status) => {
    validate.string(userToBook, 'userToBook')
    validate.string(publisher, 'publisher')
    validate.string(listingId, 'listingId')
    dateStarts.type(dateStarts, 'dateStarts', Date)
    dateEnds.type(dateEnds, 'dateEnds', Date)
    status.string(status, 'status')

    validate.string(number, 'number')
    return (async () => {
        const user = await User.findById(userToBook)
        if (!user) throw new NotFoundError(`user with id ${userToBook} not found`)
        
        const publisher = await Listing.findById(publisher)
        if (!publisher) throw new NotFoundError(`user with id ${publisher} not found`)

        const listing = await Listing.findById(listingId)
        if (!listing) throw new NotFoundError(`ad with id ${listingId} not found`)

        const booking = new Booking({ listings: listingId, publisher, userToBook: userId, dateStarts, dateEnds, status: 'yellow', bookingCreated: new Date})

        user.booking.push(booking.id)
        listing.bookings.push(booking.id)

        return Promise.all([user.save(), listing.save(), booking.save()])
            .then(() => {})
        
    })()
}