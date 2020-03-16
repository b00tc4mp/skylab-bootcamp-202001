import { validate } from '../utils'
import fetch from 'node-fetch'
import { NotAllowedError, NotFoundError } from '../errors'

/**
 * Publishes a new toilet post
 * 
 * @param {string} place the place's name of the toilet
 * @param {Object} coordinates google maps coordinates
 * 
 * @returns {string} user's unique token
 * 
 * @throws {NotAllowedError} on wrong credentials or deactivated user
 * @throws {NotFoundError} on non-existent user
 */

function publishToilet(token, place, coordinates) {
    validate.string(token, 'token')
    validate.string(place, 'place')
    validate.type(coordinates, 'coordinates', Object)

    return (async () => {
        const response = await fetch('http://192.168.1.253:8085/api/users/toilet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ place, coordinates })
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
}

export default publishToilet