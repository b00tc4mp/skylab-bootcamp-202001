const context = require('./context')
const { validate } = require('sick-parks-utils')
const fetch = require('node-fetch')

/**
 * Calls API to verifify user credentials and saves the returned token in the context
 * 
 * @param {string} email user's unique e-mail
 * @param {string} password user's password
 * 
 * @returns {undefined} 
 * 
 * @throws {ContentError} if user data does not follow the format and content rules
 * @throws {TypeError} if user data does not have the correct type
 * @throws {Error} on wrong credentials
 */


module.exports = function (email, password) {
    validate.stringFrontend(email, 'email')
    validate.stringFrontend(password, 'password')
    validate.email(email, 'email')

    return (async () => {
        const response = await fetch(`${this.API_URL}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()

        const { error, token } = data

        if (error) throw new Error(error)

        await this.storage.setItem('token', token)

        return

    })()
}.bind(context)