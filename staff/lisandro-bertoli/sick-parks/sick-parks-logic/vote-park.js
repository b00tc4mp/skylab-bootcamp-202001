const context = require('./context')
const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { validate } = require('sick-parks-utils')
const fetch = require('node-fetch')

module.exports = function (userId, parkId, vote) {
    validate.string(userId, 'userId')
    validate.string(parkId, 'parkId')
    validate.type(vote, 'vote', Boolean)

    return (async () => {

        const token = await this.storage.getItem('token')

        const response = await fetch(`${this.API_URL}/users/${userId}/parks/${parkId}/vote`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ vote })
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