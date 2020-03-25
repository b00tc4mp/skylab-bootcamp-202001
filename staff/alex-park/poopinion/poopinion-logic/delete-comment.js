const { validate } = require('poopinion-utils')
const fetch = require('node-fetch')
const { NotAllowedError, NotFoundError } = require('poopinion-errors')
const context = require('./context')

/**
 * Deletes the user's comment on a toilet post
 * 
 * @param {string} toiletId toilet's unique ID
 * @param {string} commentId comment's unique ID
 * 
 * @returns {undefined} returns undefined on a successful delete
 * 
 * @throws {NotAllowedError} on a deactivated user
 * @throws {NotFoundError} on non-existent user, toilet or comment
 */

module.exports = function (toiletId, commentId) {
    validate.stringFrontend(toiletId, 'toiletId')
    validate.stringFrontend(commentId, 'commentId')

    return (async () => {
        const token = await this.storage.getItem('token')

        const response = await fetch(`${this.API_URL}/users/toilet/${toiletId}/comment/${commentId}/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        })

        const { status } = response

        if (status === 200) return

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