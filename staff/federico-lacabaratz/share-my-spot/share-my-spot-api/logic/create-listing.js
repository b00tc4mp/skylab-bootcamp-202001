const { validate } = require('share-my-spot-utils')
const { models: { User, Listing } } = require('share-my-spot-data')
const fs = require('fs')
const path = require('path')
const { NotFoundError } = require('share-my-spot-errors')

const filesDir = path.join(__dirname, `../data/listings`)

module.exports = (publisher, title, description, addressLocation, addressStNumber, addressOther, dateStarts, dateEnds, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, photos, price, acceptsBarker, surveillance, isCovered) => {
    validate.string(publisher, 'publisher')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(addressLocation, 'addressLocation')
    validate.string(addressStNumber, 'addressStNumber')
    validate.string(addressOther, 'addressOther')
    validate.type(dateStarts, 'dateStarts', Date)
    validate.type(dateEnds, 'dateEnds', Date)
    validate.type(hourStarts, 'hourStarts', Number)
    validate.type(hourEnds, 'hourEnds', Number)
    validate.type(mon, 'mon', Boolean)
    validate.type(tue, 'tue', Boolean)
    validate.type(wed, 'wed', Boolean)
    validate.type(thu, 'thu', Boolean)
    validate.type(fri, 'fri', Boolean)
    validate.type(sat, 'sat', Boolean)
    validate.type(sun, 'sun', Boolean)
    validate.type(length, 'length', Number)
    validate.type(width, 'width', Number)
    validate.type(height, 'height', Number)
    validate.type(area, 'area', Number)
    validate.type(price, 'price', Number)
    validate.type(acceptsBarker, 'acceptsBarker', Boolean)
    validate.type(surveillance, 'surveillance', Boolean)
    validate.type(isCovered, 'isCovered', Boolean)


    return User.findById(publisher)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${publisher} does not exist`)

            const listing = new Listing({ publisher, title, description, addressLocation, addressStNumber, addressOther, dateStarts, dateEnds, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, photos, price, acceptsBarker, surveillance, isCovered, created: new Date })

            user.publishedListings.push(listing.id)

            return Promise.all([user.save(), listing.save()])
                .then(() => fs.mkdirSync(path.join(filesDir, listing.id), (err) => {
                    if (err) throw err
                }))
        })
}
