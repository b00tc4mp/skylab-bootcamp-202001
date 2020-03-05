import { validate } from 'events-utils'

const API_URL = process.env.REACT_APP_API_URL

async function authenticateUser(email, password) {
    validate.string(email, 'email')
    validate.string(password, 'password')

    const response = await fetch(`${API_URL}/users/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })

    const { error, token } = await response.json()

    if (error) throw new Error(error)

    return token
}

export default authenticateUser