const { models: { User, Park } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')
const { NotFoundError, NotAllowedError } = require('sick-parks-errors')

module.exports = ({ parkId }) => {
    validate.string(parkId)

    return (async () => {
        const park = await Park.findById(parkId)
            .populate('creator', 'name')
            .populate('features')
            .lean()


        debugger

    })()
}

