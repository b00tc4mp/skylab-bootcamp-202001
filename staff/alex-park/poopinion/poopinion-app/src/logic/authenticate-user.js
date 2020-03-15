import { validate } from '../utils'
import { NotAllowedError, NotFoundError } from '../errors'
import fetch from 'node-fetch'

function authenticateUser(email, password) {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`http://192.168.1.253:8085/api/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const { status } = response

        if (status === 200) {
            const { token } = await response.json()

            return token
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()


            if (status === 401) {
                throw new NotAllowedError(error)
            }

            if (status === 404) {
                throw new NotFoundError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}

export default authenticateUser