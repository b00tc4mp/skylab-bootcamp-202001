export default function (email, password) {
    if (typeof email !== 'string') throw new TypeError(`email ${email} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)

    return fetch(`http://localhost:8080/users/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            const { error: _error, token } = data

            if (_error) throw new Error(_error)

            return token
        })

}


