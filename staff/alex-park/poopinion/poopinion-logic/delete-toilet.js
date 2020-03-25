const { validate } = require('poopinion-utils')
const fetch = require('node-fetch')
const { NotAllowedError, NotFoundError } = require('poopinion-errors')
const context = require('./context')

/**
 * Deletes the user's toilet post
 * 
 * @param {string} toiletId toilet's unique ID
 * 
 * @returns {undefined} returns undefined on a successful delete
 * 
 * @throws {NotAllowedError} on a deactivated user
 * @throws {NotFoundError} on non-existent user, toilet or comment
 */

module.exports = function (toiletId) {
    validate.stringFrontend(toiletId, 'toiletId')

    return (async () => {
        const token = await this.storage.getItem('token')
        const deletePicture = await fetch(`${this.API_URL}/toilet/${toiletId}/delete-image`, {
            method: 'DELETE'
        })

        const { status } = deletePicture

        if (status === 200) {
            const response = await fetch(`${this.API_URL}/users/toilet/${toiletId}/delete`, {
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
        }

        if (status === 404) {
            const { error } = await deletePicture.json()

            throw new NotFoundError(error)
        }

        throw new Error('server error')
    })()
}.bind(context)