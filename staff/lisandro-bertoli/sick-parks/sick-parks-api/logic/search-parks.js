const { models: { Park } } = require('sick-parks-data')
const { NotFoundError } = require('sick-parks-errors')
const { validate } = require('sick-parks-utils')

module.exports = ({ q, _location }) => {
    validate.string(q, 'query')
    q = q.toLowerCase()
    //REMEMBER TO ADD THE INDEX TO location.coordinates FROM SHELL
    if (_location) _location = [_location[0], _location[0]]
    return (async () => {
        let results
        if (q === 'verified') {
            results = await Park.find({ verified: true }).lean()

        } else if (q === 'latest') {

            results = await Park.find().sort({ created: -1 }).lean()

        } else if (_location) {

            results = await Park.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: q } },
                            { resort: { $regex: q } },
                            { level: { $regex: q } },
                            { size: { $regex: q } }
                        ]
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

        } else {
            results = await Park.find({
                $or: [
                    { name: { $regex: q } },
                    { resort: { $regex: q } },
                    { level: { $regex: q } },
                    { size: { $regex: q } }]
            })
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