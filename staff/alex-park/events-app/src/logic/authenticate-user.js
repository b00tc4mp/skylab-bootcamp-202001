module.exports = function (email, password) {
    // if (typeof username !== 'string') throw new TypeError(`username ${username} is not a string`)
    // if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)

    return fetch(`/users/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            const { error: _error, token } = JSON.parse(response.content)

            if (_error) throw new Error(_error)

            return token
        })
}