const { validate } = require('share-my-spot-utils')
const { models: { User, Listing } } = require('share-my-spot-data')

module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    const listing = new Listing({ publisher, title, description, location, date, created: new Date })

    return listing.save()
        .then(listings => {
            return User.findOneAndUpdate({ _id: publisher }, { $push: { publishedListings: listings.id } })
        })
        .then(() => { })
}