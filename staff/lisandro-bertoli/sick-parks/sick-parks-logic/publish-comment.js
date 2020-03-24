const context = require('./context')
const { validate } = require('sick-parks-utils')
const { NotFoundError } = require('sick-parks-errors')
const fetch = require('node-fetch')

module.exports = function (userId, parkId, body) {
    validate.string(userId, 'userId')
    validate.string(parkId, 'parkId')
    validate.string(body, 'body')

    return (async () => {
        const token = await this.storage.getItem('token')

        const response = await fetch(`${this.API_URL}/users/${userId}/parks/${parkId}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ body })
        })

        if (response.status === 201) return

        if (response.status >= 400 || response.status < 500) {
            const data = await response.json()
            const { error } = data

            if (response.status === 404) throw new NotFoundError(error)

            throw new Error(error)

        } else throw new Error('Server error')

    })()

}.bind(context)