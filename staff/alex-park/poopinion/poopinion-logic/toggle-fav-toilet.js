const { validate } = require('poopinion-utils')
const fetch = require('node-fetch')
const { NotAllowedError, NotFoundError } = require('poopinion-errors')
const context = require('./context')

/**
 * Toggles or untoggles the selected toilet to favorites
 * 
 * @param {string} toiletId toilet's unique ID
 * 
 * @returns {undefined} returns undefined if the toggle or untoggle was successful
 * 
 * @throws {NotAllowedError} if the user exists but has the property 'deactivated' as true
 * @throws {NotFoundError} if the user or the toilet do not exist
 */

module.exports = function (toiletId) {
    validate.stringFrontend(toiletId, 'toiletId')

    return (async () => {
        const token = await this.storage.getItem('token')
        const response = await fetch(`${this.API_URL}/users/toilet/${toiletId}/favorite`, {
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