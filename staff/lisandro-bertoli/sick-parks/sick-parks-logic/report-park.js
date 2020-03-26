const { validate } = require('sick-parks-utils')
const { NotAllowedError, NotFoundError } = require('sick-parks-errors')
const context = require('./context')
const fetch = require('node-fetch')

module.exports = function (userId, parkId, problem) {
    validate.stringFrontend(userId, 'userId')
    validate.stringFrontend(parkId, 'parkId')
    validate.stringFrontend(problem, 'problem')

    return (async () => {

        const token = await this.storage.getItem('token')
        const response = await fetch(`${this.API_URL}/users/${userId}/parks/${parkId}/report`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ problem })
        })

        if (response.status === 201) return

        if (response.status >= 400 || response.status < 500) {
            const data = await response.json()

            const { error } = data
            if (response.status === 404) throw new NotFoundError(error)
            if (response.status === 403) throw new NotAllowedError('You already filed this report')

            throw new Error(error)


        } else throw new Error('Server error')
    })()
}.bind(context)