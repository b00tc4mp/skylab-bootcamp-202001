const context = require('./context')
const { validate } = require('sick-parks-utils')
const fetch = require('node-fetch')

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