const { validate } = require('events-utils')
const { NotFoundError, NotAllowedError } = require('events-errors')
const API_URL = process.env.REACT_APP_API_URL

module.exports = (token, eventId) => {
    validate.jwt(token, 'token')
    validate.string(eventId, 'eventId')

    return (async () => {
        const response = await fetch(`${API_URL}/users/events`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ id: eventId })
        })

        if (response.status === 201) return

        const { status } = response

        if (status >= 400 && status < 500) {
            const { error } = await response.json()
            if (status === 404) throw new NotFoundError(error)
            if (status === 403) throw new NotAllowedError(error)
            if (status === 406) throw new TypeError(error)

            throw new Error(error)
        }

        throw new Error('server error')

    })()

}