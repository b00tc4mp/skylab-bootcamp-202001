const { validate } = require('poopinion-utils')
const { models: { Toilet } } = require('poopinion-data')

/**
 * Retrieves all toilet posts that matches the specified query criteria
 * 
 * @param {string} query query's criteria
 * 
 * @returns {Array} returns an array of all found results
 * 
 * @throws {NotAllowedError} if the user exists but has the property 'deactivated' as true
 * @throws {NotFoundError} if the user does not exist
 */
module.exports = query => {
    validate.string(query, 'query')

    return Toilet.find({ "place": { $regex: `.*${query}.*` } }).populate('publisher', 'name surname').lean()
        .then(toilets => {
            toilets.forEach(toilet => {
                toilet.id = toilet._id.toString()
                delete toilet._id
                delete toilet.__v
            })

            return toilets
        })
        
}