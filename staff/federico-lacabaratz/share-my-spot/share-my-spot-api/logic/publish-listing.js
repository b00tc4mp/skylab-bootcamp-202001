const { validate } = require('listings-utils')
const { models: { User, listing } } = require('listings-data')

module.exports = (publisher, title, description, location, date) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    const listing = new listing({ publisher, title, description, location, date, created: new Date })

    return listing.save()
        .then(listings => {
            return User.findOneAndUpdate({ _id: publisher }, { $push: { publishedlistings: listings.id } })
        })
        .then(() => { })
}