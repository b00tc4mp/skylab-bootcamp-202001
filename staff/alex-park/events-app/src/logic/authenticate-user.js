module.exports = function (email, password) {
    // if (typeof username !== 'string') throw new TypeError(`username ${username} is not a string`)
    // if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)

    return fetch(`/users/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.text())
        .then(data => {
            const {token} = JSON.parse(data)
            return token
        })
}