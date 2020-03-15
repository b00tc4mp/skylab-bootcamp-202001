import { validate } from '../utils'
import fetch from 'node-fetch'

const API_URL = process.env.REACT_APP_API_URL

function registerUser(name, surname, email, password, age, gender) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.type(age, 'age', Number)
    validate.gender(gender, 'gender')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch('http://192.168.1.253:8085/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password, age, gender })
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
    })()
}

export default registerUser