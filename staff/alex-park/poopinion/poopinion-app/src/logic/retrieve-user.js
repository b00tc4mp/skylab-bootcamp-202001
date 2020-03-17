import { NotAllowedError, NotFoundError } from '../errors'
import fetch from 'node-fetch'
const { validate } = require('../utils')

/**
 * Retrieves an authorized user
 * 
 * @param {string} token user's unique token
 * 
 * @returns {Object} user's unique token
 * 
 * @throws {NotAllowedError} on wrong credentials or deactivated user
 * @throws {NotFoundError} on non-existent user
 */

function retrieveUser(token) {
    validate.string(token, 'token')

    return (async () => {
        const response = await fetch(`http://192.168.1.253:8085/api/users`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        const { status } = response

        if (status === 200) {
            const user = await response.json()
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
}

export default retrieveUser