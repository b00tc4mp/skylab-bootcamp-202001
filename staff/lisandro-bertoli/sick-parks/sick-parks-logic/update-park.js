const context = require('./context')
const { validate } = require('sick-parks-utils')
const { NotAllowedError, NotFoundError } = require('sick-parks-errors')
const fetch = require('node-fetch')

module.exports = function (userId, parkId, updates) {
    validate.string(userId, 'userId')
    validate.string(parkId, 'parkId')

    return (async () => {

        const token = await this.storage.getItem('token')

        const response = await fetch(`${this.API_URL}/users/${userId}/parks/${parkId}/update`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ ...updates })
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