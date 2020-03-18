import { validate } from 'karmark-utils'
import { NotAllowedError } from 'karmark-errors'

const API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, username, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(username, 'username')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, username, password })
        })

        const { status } = response

        if (status === 201) return

        if (status >= 400 && status < 500) {
            const { error } = await response.json()
            
            switch (status) {
                case 409:
                    throw new NotAllowedError(error)
                    

            }
            throw new Error(error)

        }
        throw new Error('server error')
    })()
}
