const { models: { Park } } = require('sick-parks-data')
const { validate } = require('sick-parks-utils')

/**
 * Retrieves the parks created by a specific user
 * 

 * @param {string} id the user's unique id
 
 * 
 * @returns {Array} list of al parks data. Empty if user has no created parks
 * 
 * @throws {ContentError} if id doesn't follow the format and content rules
 * @throws {TypeError} if id does not have the correct type
 */



module.exports = (id) => {
    validate.string(id, 'userId')

    return (async () => {
        const results = await Park.find({ creator: id }).lean()

        if (!results.length) return results

        const sanitizedResults = results.map(result => {
            result.id = result._id.toString()

            const { id, name, resort, size, verified, rating } = result

            return { id, name, resort, size, verified, rating }
        })
        return sanitizedResults
    })()

}