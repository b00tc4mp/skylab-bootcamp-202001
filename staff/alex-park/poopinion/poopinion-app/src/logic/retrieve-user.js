const { NotAllowedError, NotFoundError } = require('../errors')
const fetch = require('node-fetch')
const { validate } = require('../utils')
const context = require('./context')

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

module.exports = function (token) {
    validate.string(token, 'token')

    return (async () => {
        const response = await fetch(`http://192.168.1.253:8085/api/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const { status } = response

        if (status === 200) {
            let user = await response.json()

            if (user.publishedToilets.length < 5 && user.comments.length < 10) {
                user.image = require('../../assets/profile_bronze.png')
            }

            else if (user.publishedToilets.length < 5 && user.comments.length >= 10) {
                user.image = require('../../assets/profile_bronze_pro.png')
            }

            if (user.publishedToilets.length >= 5 && user.comments.length < 10) {
                user.image = require('../../assets/profile_silver.png') 
            }
            else if (user.publishedToilets.length >= 5 && user.comments.length >= 10) {
                user.image = require('../../assets/profile_silver_pro.png') 
            }
            
            if (user.publishedToilets.length >= 10 && user.comments.length < 10) {
                user.image = require('../../assets/profile_gold.png') 
            }
            else if (user.publishedToilets.length >= 10 && user.comments.length >= 10) {
                user.image = require('../../assets/profile_gold_pro.png') 
            }

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