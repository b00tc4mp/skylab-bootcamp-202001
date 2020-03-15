const { models: { Park } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')



module.exports = ({ id }) => {
    validate.string(id, 'userId')

    return (async () => {
        const results = await Park.find({ creator: id }).lean()

        if (!results.length) return results

        const sanitizedResults = results.map(result => {
            result.id = result._id.toString()

            const { id, name, resort, size, verified } = result

            return { id, name, resort, size, verified }
        })
        return sanitizedResults
    })()

}