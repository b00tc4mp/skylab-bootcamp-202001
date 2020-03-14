// import { validate } from 'poopinion-utils'
// import fetch from 'node-fetch'

const API_URL = process.env.REACT_APP_API_URL

async function registerUser(name, surname, email, age, gender, password) {
    // validate.string(name, 'name')
    // validate.string(surname, 'surname')
    // validate.string(email, 'email')
    // validate.email(email)
    // validate.type(age, 'age', Number)
    // validate.gender(gender, 'gender')
    // validate.string(password, 'password')
    console.log(name, surname, email, age, gender, password)
    const response = await fetch('http://localhost:8085/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, email, age, gender, password })
    })

    const { status } = response

    if (status === 201) return

    if (status >= 400 && status < 500) {
        const { error } = await response.json()

        if (status === 409) {
            throw new Error(error)
        }

        throw new Error(error)
    }

    throw new Error('server error')
}

export default registerUser