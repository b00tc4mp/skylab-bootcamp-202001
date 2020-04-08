const context = require('./context')
const fetch = require('node-fetch')
const { NotFoundError } = require('sick-parks-errors')

/**
 * Retrieves the the requested user
 * 
 * @returns {Object} user data
 * 
 * @throws {NotFoundError} when the provided user id in token does not match any user
 */

module.exports = function retrieveUser(fresh = false) {
    //TODO add userId as arg fro retrieveing user other than the current user
    return (async () => {
        if (fresh || !this.user) {
            const token = await this.storage.getItem('token')

            const response = await fetch(`${this.API_URL}/users`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            })

            const data = await response.json()
            const { error: _error } = data

            if (_error) throw new NotFoundError('This user does not exist anymore')

            const { id, name, surname, email, contributions, image, allowLocation, notifications } = data

            this.user = { id, name, surname, email, contributions, image, allowLocation, notifications }
        }

        return this.user
    })()
}.bind(context)