const { validate } = require('../sick-parks-utils')

const fetch = require('node-fetch')

module.exports = function ({ name, surname, email, password }) {
    validate.email(email, 'email')
    validate.string(email, 'email')
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(password, 'password')


    return (async () => {


        const response = await fetch(`http://192.168.1.101:8085/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password })
        })

        if (response.status === 201) return

        if (response.status !== 200) {
            return response.json()
                .then(response => {
                    const { error } = response

                    throw new Error(error)

                })
        }
    })()
}