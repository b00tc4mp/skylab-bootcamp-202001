const { validate } = require('sick-parks-utils')
const fetch = require('node-fetch')
const context = require('./context')

module.exports = function (name, surname, email, password) {
    validate.email(email, 'email')
    validate.string(email, 'email')
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${this.API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password })
        })

        if (response.status === 201) return

        if (response.status >= 400 || response.status < 500) {
            return response.json()
                .then(response => {
                    const { error } = response

                    throw new Error(error)

                })
        } else throw new Error('Unknown error')


    })()
}.bind(context)