const { NotAllowedError, NotFoundError } = require('poopinion-errors')
const fetch = require('node-fetch')
const context = require('./context')

/**
 * Retrieves an authorized user
 * 
 * @returns {Object} an Object containing all user's info
 * 
 * @throws {NotAllowedError} on wrong credentials or deactivated user
 * @throws {NotFoundError} on non-existent user
 */

module.exports = function () {
   

    return (async () => {
        const token = await this.storage.getItem('token')

        const response = await fetch(`${this.API_URL}/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const { status } = response

        if (status === 200) {
            let user = await response.json()

            return user
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