const { validate } = require('../utils')
const fetch = require('node-fetch')
const { NotAllowedError, NotFoundError } = require('../errors')
const context = require('./context')

/**
 * Retrieves all toilets that are marked as favorite by the user
 * 
 * @param {string} token user's unique token
 * 
 * @returns {Array} returns an array of all the toilet posts. Empty array if there is none.
 * 
 * @throws {NotAllowedError} if the user exists but has the property 'deactivated' as true
 * @throws {NotFoundError} if the user does not exist
 */

module.exports = function (token) {
    validate.string(token, 'token')

    return (async () => {
        const response = await fetch(`http://192.168.1.253:8085/api/users/favorites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const { status } = response

        if (status === 200) {
            const toilets = await response.json()
            return toilets
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            if (status === 404) {
                throw new NotFoundError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}.bind(context)