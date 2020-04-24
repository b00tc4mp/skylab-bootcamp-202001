const { NotFoundError } = require('sick-parks-errors')
const { validate } = require('sick-parks-utils')
const context = require('./context')
const fetch = require('node-fetch')

/**
 * Retrieves the requested park.

 * @param {string} parkId the park's unique id
 
 * 
 * @returns {object} park data
 * 
 * @throws {ContentError} if params don't follow the format and content rules
 * @throws {TypeError} if parkId does not have the correct type
 * @throws {NotFoundError} when the provided parkId does not match any park
 */



module.exports = function (parkId) {
    validate.stringFrontend(parkId, 'parkId')

    return (async () => {

        const response = await fetch(`${this.API_URL}/parks/${parkId}`)

        if (response.status === 200) {
            const data = await response.json()
            const { park } = data

            return park
        }


        if (response.status >= 400 || response.status < 500) {
            const data = await response.json()

            const { error } = data
            if (response.status === 404) throw new NotFoundError(`the park you are looking for does not exist or has been deleted`)


            throw new Error(error)


        } else throw new Error('Server error')

    })()

}.bind(context)