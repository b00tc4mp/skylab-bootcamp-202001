const { models: { Park } } = require('sick-parks-data')
const { NotFoundError } = require('sick-parks-errors')
const { validate } = require('sick-parks-utils')

module.exports = ({ q, _location }) => {
    validate.string(q, 'query')

    //REMEMBER TO ADD THE INDEX TO location.coordinates FROM SHELL
    _location = [_location[0], _location[0]]
    return (async () => {
        let results
        if (q === 'verified') {
            results = await Park.find({ verified: true }).lean()

        } else if (q === 'latest') {
            results = await Park.find({ date: { $gte: new Date } }).sort({ date: -1 }).lean()
        } else {

            results = await Park.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: q } },
                            { resort: { $regex: q } },
                            { level: { $regex: q } }]
                    },
                    {
                        location: {
                            $near: {
                                $geometry: {
                                    type: 'Point',
                                    coordinates: _location
                                }
                            }
                        }
                    }

                ]
            }).lean()

        }

        if (!results.length) return results

        const sanitizedResults = results.map(result => {
            result.id = result._id.toString()

            const { id, name, resort, size, verified } = result //TODO send location

            return { id, name, resort, size, verified }
        })

        return sanitizedResults
    })()

}