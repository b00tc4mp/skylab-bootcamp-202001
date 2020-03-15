const { validate } = require('../../share-my-spot-utils')
const { models: { User, Booking, Listing } } = require('../../share-my-spot-data')
const { NotFoundError, NotAllowedError } = require('../../share-my-spot-errors')

module.exports = (userToBook, publisher, listingId, dateStarts, dateEnds, status) => {
    validate.string(userToBook, 'userToBook')
    validate.string(publisher, 'publisher')
    validate.string(listingId, 'listingId')
    dateStarts.type(dateStarts, 'dateStarts'): { type: Date, required: true },
    dateEnds: { type: Date, required: true },
    status: {type: String, default: 'red'},

    validate.string(number, 'number')
    return (async () => {
        const user = await User.findById(userToBook)
        if (!user) throw new NotFoundError(`user with id ${userToBook} not found`)
        
        const publisher = await Listing.findById(publisher)
        if (!publisher) throw new NotFoundError(`user with id ${publisher} not found`)

        const listing = await Listing.findById(listingId)
        if (!listing) throw new NotFoundError(`ad with id ${listingId} not found`)


        
    })()

