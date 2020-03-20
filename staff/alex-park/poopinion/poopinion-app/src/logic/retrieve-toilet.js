import { validate } from '../utils'
import fetch from 'node-fetch'
import { NotFoundError } from '../errors'

/**
 * Retrieves the detailed info about an specific toilet
 * 
 * @param {string} toiletId toilet's unique ID
 * 
 * @returns {Object} returns an object with all the toilet info
 * 
 * @throws {NotFoundError} if the toilet do not exist
 */

function retrieveToilet(toiletId) {
    validate.string(toiletId, 'toiletId')

    return (async () => {
        const response = await fetch(`http://192.168.1.253:8085/api/toilets/${toiletId}`)

        const { status } = response

        if (status === 200) {
            const toilet = await response.json()
            return toilet
        }
        
        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 404) {
                throw new NotFoundError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}

export default retrieveToilet