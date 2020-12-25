const { NotAllowedError, NotFoundError } = require('../errors') 
const { validate } = require('../utils')
const fetch = require('node-fetch') 
const context = require('./context')

/**
 * Finds and receives contacts from the user
 * 
 * @param {string} id user's unique id
 * 
 * @returns {<array>} user's contacts
 * 
 * @throws {NotFoundError} if the user does not exist
 * @throws {Error} if there are unkown error from the api or server's error
 */

module.exports = function () {

    return (async() => {
        const token = await this.storage.getItem('token')
   
        const response = await fetch(`${this.API_URL}/users/contacts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    
        const { status } = response
        
        if (status === 200) {
            const contacts = await response.json()
            
            return contacts
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
    
}.bind(context)