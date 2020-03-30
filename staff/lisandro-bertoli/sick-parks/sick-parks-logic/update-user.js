const context = require('./context')
const { validate } = require('sick-parks-utils')
const { NotAllowedError, NotFoundError } = require('sick-parks-errors')
const fetch = require('node-fetch')


/**
 * Updates the user with the new given data.
 * 
 * @param {string} id the user's unique id
 * @param {Object} data the modifications to be made
 * 
 * @returns {undefined} 
 * 
 * @throws {ContentError} if params don't follow the format and content rules
 * @throws {TypeError} if userId or data and data do not have the correct type
 * @throws {Error} if the oldPassword or password are not given when required
 * @throws {NotFoundError} if the provided user id does not match any user
 * @throws {NotAllowedError} if any of the keys in data are not valid
 * @throws {NotAllowedError} if oldPassword does not match the user's password
 * 
 */

module.exports = function (id, data) {
    validate.stringFrontend(id, 'userId')
    validate.type(data, 'updates', Object)

    const { name, email, allowLocation, notifications, password, oldPassword } = data

    if (name !== undefined) {
        validate.stringFrontend(name, 'name')
    }

    if (email !== undefined) {
        validate.stringFrontend(email, 'email')
    }

    if (notifications !== undefined) {
        validate.type(notifications, 'notifications', Boolean)
    }

    if (allowLocation !== undefined) {
        validate.type(allowLocation, 'allowLocation', Boolean)
    }

    if (password !== undefined) {
        validate.stringFrontend(password, 'password')
    }

    if (oldPassword !== undefined) {
        validate.stringFrontend(oldPassword, 'oldPassword')
    }

    if (password && !oldPassword) throw new Error('oldPassword is not defined')
    if (!password && oldPassword) throw new Error('password is not defined')

    const keys = Object.keys(data)

    const VALID_KEYS = ['name', 'allowLocation', 'email', 'password', 'oldPassword', 'notifications']

    for (const key of keys)
        if (!VALID_KEYS.includes(key)) throw new NotAllowedError(`property ${key} is not allowed`)

    return (async () => {

        const token = await this.storage.getItem('token')
        const response = await fetch(`${this.API_URL}/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ name, email, allowLocation, notifications, password, oldPassword })
        })

        if (response.status === 200) return

        if (response.status >= 400 || response.status < 500) {
            const data = await response.json()
            const { error } = data

            if (response.status === 404) throw new NotFoundError('User could not be found in our records')
            if (response.status === 403) throw new NotAllowedError(error)

            throw new Error(error)

        } else throw new Error('Server error')

    })()

}.bind(context)