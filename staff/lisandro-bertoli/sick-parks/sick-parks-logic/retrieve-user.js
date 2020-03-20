const context = require('./context')
const API_URL = process.env.API_URL
const fetch = require('node-fetch')
const atob = require('atob')

module.exports = function retrieveUser() {

    return (async () => {
        const token = await this.storage.getItem('token')
        const [, payload] = token.split('.')
        const { sub } = atob(payload)

        const response = await fetch(`${API_URL}/users/${sub}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })

        const data = await response.json()
        const { error: _error } = data

        if (_error) throw new Error(_error)
        debugger
        const { name, surname, email, contributions, image, allowLocation, notifications } = data

        return { name, surname, email, contributions, image, allowLocation, notifications }

    })()
}.bind(context)