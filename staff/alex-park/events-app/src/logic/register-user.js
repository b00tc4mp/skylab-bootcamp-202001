import { validate } from 'events-utils'
const API_URL = process.env.REACT_APP_API_URL

async function registerUser(name, surname, email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password })
    })

    const { status } = response

    if (status === 201) return

    else if (status === 409) {
        const conflict = await response.json()
        const { error } = conflict

        throw new Error(error)
    }
    else throw new Error('Unknown error')
}

export default registerUser