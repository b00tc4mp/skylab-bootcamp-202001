const { validate } = require('events-utils')


export default function (token) {
    validate.jwt(token)

    return (async () => {
        const response = await fetch(`http://localhost:8080/users`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })

        const data = await response.json()
        const { error: _error } = data

        if (_error) throw new Error(_error)

        const { name, surname, username } = data

        return { name, surname, username }

    })()
}

