const { validate } = require('poopinion-utils')
const fetch = require('node-fetch')
const { NotAllowedError, NotFoundError } = require('poopinion-errors')
const context = require('./context')

/**
 * Publishes a new comment on a toilet post
 * 
 * @param {string} toiletId toilet's unique ID
 * @param {Object} rating all rating info
 * 
 * @returns {string} user's unique token
 * 
 * @throws {NotAllowedError} on wrong credentials or deactivated user
 * @throws {NotFoundError} on non-existent user
 */

module.exports = function (toiletId, rating) {
    validate.stringFrontend(toiletId, 'toiletId')
    validate.type(rating, 'rating', Object)

    return (async () => {
        const token = await this.storage.getItem('token')
        const response = await fetch(`${this.API_URL}/users/toilet/${toiletId}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(rating)
        })

        const { status } = response

        if (status === 201) return

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
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