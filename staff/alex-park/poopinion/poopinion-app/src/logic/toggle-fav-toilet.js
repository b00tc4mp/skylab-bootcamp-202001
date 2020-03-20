const { validate } = require('../utils')
const fetch = require('node-fetch')
const { NotAllowedError, NotFoundError } = require('../errors')
const context = require('./context')

/**
 * Toggles or untoggles the selected toilet to favorites
 * 
 * @param {string} token user's unique token
 * @param {string} toiletId toilet's unique ID
 * 
 * @returns {undefined} returns undefined if the toggle or untoggle was successful
 * 
 * @throws {NotAllowedError} if the user exists but has the property 'deactivated' as true
 * @throws {NotFoundError} if the user or the toilet do not exis
 */

module.exports = function (token, toiletId) {
    validate.string(token, 'token')
    validate.string(toiletId, 'toiletId')

    return (async () => {
        const response = await fetch(`http://192.168.1.253:8085/api/users/toilet/${toiletId}/favorite`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const { status } = response

        if (status === 200) return

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