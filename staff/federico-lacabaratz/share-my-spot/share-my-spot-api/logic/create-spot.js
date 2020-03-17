const { validate } = require('share-my-spot-utils')
const { models: { User, Spot } } = require('share-my-spot-data')
const fs = require('fs')
const path = require('path')
const { NotFoundError } = require('share-my-spot-errors')

const filesDir = path.join(__dirname, `../data/spots`)

module.exports = (publisherId, title, description, addressLocation, addressStNumber, addressOther, dateStarts, dateEnds, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, photos, price, acceptsBarker, surveillance, isCovered, status) => {
    validate.string(publisherId, 'publisherId')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(addressLocation, 'addressLocation')
    validate.string(addressStNumber, 'addressStNumber')
    validate.string(addressOther, 'addressOther')
    validate.type(length, 'length', Number)
    validate.type(width, 'width', Number)
    validate.type(height, 'height', Number)
    validate.type(area, 'area', Number)
    validate.string(description, 'description')
    validate.type(price, 'price', Number)
    validate.type(acceptsBarker, 'acceptsBarker', Boolean)
    validate.type(surveillance, 'surveillance', Boolean)
    validate.type(isCovered, 'isCovered', Boolean)
    validate.type(hourStarts, 'hourStarts', Number)
    validate.type(hourEnds, 'hourEnds', Number)
    validate.type(mon, 'mon', Boolean)
    validate.type(tue, 'tue', Boolean)
    validate.type(wed, 'wed', Boolean)
    validate.type(thu, 'thu', Boolean)
    validate.type(fri, 'fri', Boolean)
    validate.type(sat, 'sat', Boolean)
    validate.type(sun, 'sun', Boolean)


    return User.findById(publisherId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${publisherId} does not exist`)

            const spot = new Spot({ publisherId, title, description, addressLocation, addressStNumber, addressOther, dateStarts, dateEnds, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, photos, price, acceptsBarker, surveillance, isCovered, status, created: new Date })

            user.publishedSpots.push(spot.id)

            return Promise.all([user.save(), spot.save()])
                .then(() => fs.mkdirSync(path.join(filesDir, spot.id), (err) => {
                    if (err) throw err
                }))
        })
}
