const { validate } = require('events-utils')

export default async function (token, title, description, location, date) {
    validate.string(token)
    
    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no user id in token')

    const create = await fetch(`http://localhost:8085/users/${sub}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ title, description, location, date })
    })
    return await create
}