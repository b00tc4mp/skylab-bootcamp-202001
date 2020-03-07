import { validate } from 'events-utils'
const { NotAllowedError } = require('events-errors')

const API_URL = process.env.REACT_APP_API_URL

async function authenticateUser(email, password) {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    const response = await fetch(`${API_URL}/users/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })

    const { status } = response

    if (status === 200) {
        const { token } = await response.json()

        return token
    }

    if (status >= 400 && status < 500) {
        const { error } = await response.json()

        if (error === 401) throw new NotAllowedError(error)
    }

    throw new Error(error)
}

export default authenticateUser