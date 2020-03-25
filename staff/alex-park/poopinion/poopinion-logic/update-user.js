const { validate } = require('poopinion-utils')
const fetch = require('node-fetch')
const { NotAllowedError, NotFoundError } = require('poopinion-errors')
const context = require('./context')

/**
 * Updates the user's info. Requires a password
 * 
 * @param {Object} data all new data info
 * 
 * @returns {undefined} undefined on a successful update
 * 
 * @throws {NotAllowedError} on wrong credentials or deactivated user
 * @throws {NotFoundError} on non-existent user
 */

module.exports = function (data) {
    validate.type(data, 'data', Object)
    const { password, newPassword } = data
    validate.stringFrontend(password, 'password')
    if (!newPassword) delete data.newPassword

    return (async () => {
        const token = await this.storage.getItem('token')
        const response = await fetch(`${this.API_URL}/users/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(data)
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