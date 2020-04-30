const { models: { Park } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')
const { NotFoundError } = require('sick-parks-errors')

/**
 * Retrieves the requested park from the storage
 * 
 * @param {string} parkId the park's unique id
 * 
 * @returns {Promise<Object>} park data
 * 
 * @throws {ContentError} if params don't follow the format and content rules
 * @throws {TypeError} if parkId does not have the correct type
 * @throws {NotFoundError} when the provided parkId does not match any park
 */

module.exports = (parkId) => {
    validate.string(parkId, 'park id')

    return (async () => {
        const park = await Park.findById(parkId)
            .populate('creator', 'name')
            .populate('comments.postedBy', 'name')
            .lean()

        if (!park) throw new NotFoundError(`park ${parkId} does not exist`)

        park.id = park._id.toString()
        park.creator.id = park.creator._id.toString()

        delete park.creator._id
        delete park._id
        delete park.__v

        park.features.forEach(feature => {
            feature.id = feature._id.toString()
            delete feature._id

        })

        return park
    })()
}

