const API_URL = process.env.REACT_APP_API_URL

const { validate } = require('events-utils')

module.exports = function (name, surname, email, password) {
    validate.email(email, 'email')
    validate.string(email, 'email')
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(password, 'password')


    return (async () => {


        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password })
        })
        debugger
        if (response.status === 201) return

        if (response.status === 409) {
            return response.json()
                .then(response => {
                    const { error } = response

                    throw new Error(error)

                })
        } else throw new Error('Unknown error')

    })()
}

