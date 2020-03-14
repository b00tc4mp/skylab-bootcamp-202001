const { validate } = require ('pill-o-clock-utils')
const { NotAllowedError } = require('pill-o-clock-errors')

//const { env: { REACT_APP_API_URL: API_URL } } = process

const API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, age, phone, profile, email, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(gender, 'gender')
    validate.gender(gender)
    validate.type(age, 'age', Number)
    validate.string(phone, 'phone')
    validate.string(profile, 'profile')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, age, phone, profile, email, password })
        })

        const { status } = response

        if (status === 201) return

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}