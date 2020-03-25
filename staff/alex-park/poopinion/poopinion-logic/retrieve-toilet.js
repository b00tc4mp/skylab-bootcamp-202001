const { validate } = require('poopinion-utils')
const fetch = require('node-fetch')
const { NotFoundError } = require('poopinion-errors')
const context = require('./context')

/**
 * Retrieves the detailed info about an specific toilet
 * 
 * @param {string} toiletId toilet's unique ID
 * 
 * @returns {Object} returns an object with all the toilet info
 * 
 * @throws {NotFoundError} if the toilet does not exist
 */

module.exports = function (toiletId) {
    validate.stringFrontend(toiletId, 'toiletId')

    return (async () => {
        const response = await fetch(`${this.API_URL}/toilets/${toiletId}`)

        const { status } = response

        if (status === 200) {
            const toilet = await response.json()
            return toilet
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 404) {
                throw new NotFoundError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}.bind(context)