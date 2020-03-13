const { models: { User, Park } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')
const { NotFoundError, NotAllowedError } = require('sick-parks-errors')

module.exports = ({ parkId }) => {
    validate.string(parkId, 'parkId')

    return (async () => {
        const park = await Park.findById(parkId)
            .populate('creator', 'name')
            .lean()

        if (!park) throw new NotFoundError(`park ${parkId} does not exist`)

        park.id = park._id.toString()
        park.creator.id = park.creator._id.toString()
        delete park.creator._id
        park.features.forEach(feature => {
            feature.id = feature._id.toString()
            delete feature._id
        })

        const { name, id, resort, features, description, creator } = park

        return { name, creator, id, resort, description, features }
    })()
}

