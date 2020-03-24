const { validate } = require('../utils')
const fetch = require('node-fetch')
const { NotAllowedError, NotFoundError } = require('../errors')
const context = require('./context')

/**
 * Deletes the user's comment on a toilet post
 * 
 * @param {string} token user's unique token
 * @param {string} toiletId toilet's unique ID
 * @param {string} commentId comment's unique ID
 * 
 * @returns {undefined} returns undefined on a successful delete
 * 
 * @throws {NotAllowedError} on a deactivated user
 * @throws {NotFoundError} on non-existent user, toilet or comment
 */

module.exports = function (token, toiletId, commentId) {
    validate.stringFrontend(token, 'token')
    validate.stringFrontend(toiletId, 'toiletId')
    validate.stringFrontend(commentId, 'commentId')

    return (async () => {
        const response = await fetch(`http://192.168.1.253:8085/api/users/toilet/${toiletId}/comment/${commentId}/delete`, {
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