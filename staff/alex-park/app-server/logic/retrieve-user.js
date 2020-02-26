const { fetch } = require('../utils')

module.exports = function (token) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: undefined
    })
    .then(response => {
        const send = JSON.parse(response.content), { error: _error } = send

        if (_error) throw new Error(_error)

        return { name: send.name, surname: send.surname, username: send.username }
    })
}