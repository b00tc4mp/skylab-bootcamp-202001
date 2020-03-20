const fetch = require('node-fetch')
const { ContentError } = require('sick-parks-errors')
const context = require('./context')
const atob = require('atob')

module.exports = function () {

    return (async () => {
        const token = await this.storage.getItem('token')

        const [, payload] = token.split('.')
        const { sub } = atob(payload)


        const response = await fetch(`http://192.168.1.101:8085/api/users/${sub}/parks`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })

        if (response.status === 406) {
            const { error } = await response.json()
            throw new ContentError(error)
        }

        if (response.status >= 400 && response.status < 500) throw new Error('Unknown Error')

        if (response.status >= 500) throw new Error('server error')

        const { results } = await response.json()

        return results
    })()

}.bind(context)