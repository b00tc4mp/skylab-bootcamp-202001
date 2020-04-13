const context = require('./context')
const { validate } = require('sick-parks-utils')
const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const fetch = require('node-fetch')

/**
 * Sends reques to delte the park from storage. 
 * 
 * @param {string} parkId park's unique id
 * 
 * @returns {undefined}
 * 
 * @throws {ContentError} if park id doesn't follow the format and content rules
 * @throws {TypeError} if parkId does not have the correct type
 * @throws {NotFoundError} when the provided parkId to the API does not match any park
 * @throws {NotAllowedError} when the user trying to delete the park is not the creator
 */

module.exports = function (parkId) {
    validate.string(parkId, 'parkId')

    return (async () => {

        const token = await this.storage.getItem('token')

        const response = await fetch(`${this.API_URL}/users/asdf23/parks/${parkId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })

        if (response.status === 200) return

        if (response.status >= 400 || response.status < 500) {
            const data = await response.json()

            const { error } = data
            if (response.status === 404) throw new NotFoundError(error)
            if (response.status === 403) throw new NotAllowedError(error)

            throw new Error(error)


        } else throw new Error('Server error')

    })()
}.bind(context)