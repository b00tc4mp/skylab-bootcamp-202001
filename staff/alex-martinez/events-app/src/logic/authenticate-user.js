
const API_URL = process.env.REACT_APP_API_URL
const { validate } = require('events-utils')

export default function (email, password) {
    validate.email(email, 'email')
    validate.string(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${API_URL}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()

        const { error: _error, token } = data

        if (_error) throw new Error(_error)

        return token
    })()
}


