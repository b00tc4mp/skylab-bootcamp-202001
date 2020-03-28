const { models: { Park } } = require('sick-parks-data')
const { NotFoundError } = require('sick-parks-errors')
const { validate } = require('sick-parks-utils')

module.exports = ({ q, location }) => {
    validate.string(q, 'query', false)
    const _location = location.map(coordinate => parseFloat(coordinate))

    let filter = {
        $and: [
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
    }

    switch (true) {
        case q === 'latest':
            filter = 'latest'
            break
        case q === 'verified':
            filter.$and.unshift({ verified: true })
            break
        case q !== '':
            filter.$and.unshift({
                $or: [
                    { name: { $regex: q } },
                    { resort: { $regex: q } },
                    { level: { $regex: q } },
                    { size: { $regex: q } }
                ]
            })
            break
        default:
            break
    }

    return (async () => {
        let results


        if (filter === 'latest') results = await Park.find().sort({ created: -1 }).lean()
        else results = await Park.find(filter).lean()


        if (!results.length) return results

        const sanitizedResults = results.map(result => {
            result.id = result._id.toString()
            result.name = result.name.charAt(0).toUpperCase() + result.name.slice(1)
            result.resort = result.resort.charAt(0).toUpperCase() + result.resort.slice(1)

            const { id, name, resort, size, verified, rating } = result //TODO send location

            return { id, name, resort, size, verified, rating }
        })

        return sanitizedResults
    })()

}