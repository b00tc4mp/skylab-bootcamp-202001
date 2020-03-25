const context = require('./context')
const { validate } = require('sick-parks-utils')
const { NotFoundError, NotAllowedError } = require('sick-parks-errors')
const { models: { User, Park } } = require('sick-parks-data')
const fetch = require('node-fetch')

module.exports = function (parkId) {
    validate.string(parkId, 'parkId')

    return (async () => {

        const token = await this.storage.getItem('token')
        debugger
        const response = await fetch(`${this.API_URL}/users/asdf23/parks/${parkId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
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