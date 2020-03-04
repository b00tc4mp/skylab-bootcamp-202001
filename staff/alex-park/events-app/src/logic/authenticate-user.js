import { validate } from 'events-utils'

const API_URL = process.env.REACT_APP_API_URL

function authenticateUser (email, password) {
    validate.string(email, 'email')
    validate.string(password, 'password')

    return fetch(`${API_URL}/users/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(({ error, token }) => {
            if (error) throw new Error(error)
            return token
        })
}

export default authenticateUser

///

function authenticateUser (email, password) {
    validate.string
}