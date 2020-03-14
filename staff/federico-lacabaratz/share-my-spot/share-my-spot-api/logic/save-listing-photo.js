const { validate } = require('share-my-spot-utils')
const { models: { User, Listing } } = require('share-my-spot-data')
const fs = require('fs')
const path = require('path')
const { NotFoundError } = require('share-my-spot-errors')

module.exports = (userId, listingId, photoStream) => {
    validate.string(userId, 'userId')
    validate.string(listingId, 'listingId')
    // TODO validate userId, listingId, photoStream
    // TODO check user id and listing id are related
    // TODO write photo stream into data/listings/<listingId>
    
    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)
    
        const listing = await Listing.findById({publisher : userId})
        if (!listing) throw new NotFoundError(`user ${userId} hasn't created any listings yet`)
        
        const busboy = new Busboy({ headers: req.headers })
        
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => file.pipe(fs.createWriteStream(`uploads/${filename}`)))
        
        busboy.on('finish', () => res.send('uploaded\n'))
        
        req.pipe(busboy)
            
    })()
    
}
