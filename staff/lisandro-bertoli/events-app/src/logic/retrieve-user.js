const atob = require('atob')


module.exports = function (token) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no user id in token')

    return fetch(`http://localhost:8080/users`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
        .then(response => response.json())
        .then(data => {


            const { error: _error } = data

            if (_error) throw new Error(_error)

            const { name, surname, username } = data

            return { name, surname, username }

        })
}

