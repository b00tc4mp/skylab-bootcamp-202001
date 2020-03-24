const { validate } = require('../utils')
const fetch = require('node-fetch')
const { NotAllowedError, NotFoundError } = require('../errors')
const context = require('./context')

/**
 * Updates the user's comment on a toilet post
 * 
 * @param {string} token user's unique token
 * @param {string} commentId comment's unique ID
 * @param {Object} rating all rating info
 * 
 * @returns {string} user's unique token
 * 
 * @throws {NotAllowedError} on wrong credentials or deactivated user
 * @throws {NotFoundError} on non-existent user
 */

module.exports = function (token, commentId, rating) {
    validate.stringFrontend(token, 'token')
    validate.stringFrontend(commentId, 'commentId')
    validate.type(rating, 'rating', Object)

    return (async () => {
        const response = await fetch(`http://192.168.1.253:8085/api/users/comment/${commentId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(rating)
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