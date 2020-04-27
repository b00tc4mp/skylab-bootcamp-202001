const { models: { Park } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')
const { NotFoundError } = require('sick-parks-errors')

/**
 * Search for the parks in storage that match the given query. 
 * Ordering them by distance.
 * 
 * @param {Object} query the requests query
 * @param {string} query.q the query itself provided by the user
 * @param {Array} query.location the location of the user
 * 
 * @returns {Array} list of matching results. Empty if no matches
 * 
 * @throws {ContentError} if params don't follow the format and content rules
 * @throws {TypeError} if query does not have the correct type
 * @throws {NotFoundError} if query returns no results
 * 
 */


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
        case q.toLowerCase() === 'latest':
            filter = 'latest'
            break
        case q.toLowerCase() === 'verified':
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

        if (!results.length) throw new NotFoundError(`No results for ${q}`)

        const sanitizedResults = results.map(result => {
            result.id = result._id.toString()
            result.name = result.name.charAt(0).toUpperCase() + result.name.slice(1)
            result.resort = result.resort.charAt(0).toUpperCase() + result.resort.slice(1)

            const { id, name, resort, size, verified, rating } = result

            return { id, name, resort, size, verified, rating }
        })

        return sanitizedResults
    })()

}