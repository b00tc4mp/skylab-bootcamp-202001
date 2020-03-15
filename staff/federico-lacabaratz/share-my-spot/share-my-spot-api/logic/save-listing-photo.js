require('dotenv').config()
const { validate } = require('share-my-spot-utils')
const { NotFoundError } = require('share-my-spot-errors')
const { models: { User, Listing } } = require('share-my-spot-data')
const fs = require('fs')
const path = require('path')

/**
* Saves listing image
* 
* @param {ObjectId} userId of user
* @param {ObjectuserI} listingId id of listing
* @param {Stream} file data of the image
* @param {Sting} filename name of the image
*
* @returns {Promise} - user.  
*/


module.exports = function (userId, listingId, file, filename) {
    validate.string(userId, 'userId')
    validate.string(listingId, 'listingId')
    validate.string(filename, 'filename')

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const listing = await Listing.findById(listingId)
        if (!listing) throw new NotFoundError(`ad with id ${listingId} not found`)

        const dir = `./data/listings/${listingId}`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }, err => { })
        }
        let saveTo = path.join(__dirname, `../data/listings/${listingId}/${filename}.jpg`)
        return file.pipe(fs.createWriteStream(saveTo))
    })()
}
