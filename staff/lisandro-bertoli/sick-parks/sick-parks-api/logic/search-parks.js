const { models: { Park } } = require('sick-parks-data')
const { NotFoundError } = require('sick-parks-errors')
const { validate } = require('sick-parks-utils')

module.exports = ({ q, _location }) => {
    validate.string(q, 'query')

    return (async () => {
        const results = await Park.find({
            // $and: [
            //     {
            $or: [
                { name: { $regex: q } },
                { resort: { $regex: q } },
                { level: { $regex: q } }]
            // },
            // {
            // location: {
            //     $near: {
            //         $geometry: {
            //             type: 'Point',
            //             coordinates: _location
            //         }
            //     }
            // }
            //     }

            // ]
        }).lean()

        if (!results.length) return results

        const sanitizedResults = results.map(result => {
            result.id = result._id.toString()

            const { id, name, resort, size, verified } = result

            return { id, name, resort, size, verified }
        })

        debugger
        return sanitizedResults
    })()

}