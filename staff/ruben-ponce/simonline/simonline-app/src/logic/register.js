//const { validate } = require('simonline-utils')

const API_URL = process.env.REACT_APP_API_URL

export default function (username, password) {
    // validate.string(username, 'username')
    // validate.string(password, 'password')

    return (async () => {

        const register = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        const status = await register.status

        if (status === 409 || status === 406 || status === 403) {
            const { error } = await register
            return new Error(error)
        }

        else if (status === 201) return

        else return new Error('Unknown error')

    })()
}