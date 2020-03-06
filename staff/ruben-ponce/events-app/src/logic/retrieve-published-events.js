const { validate } = require('events-utils')

export default async function (token) {
    validate.string(token, 'token')

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    const retrieve = await fetch(`http://localhost:8085/events/${sub}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })

    const res = await retrieve.json()

    const results = await res

    return results
}