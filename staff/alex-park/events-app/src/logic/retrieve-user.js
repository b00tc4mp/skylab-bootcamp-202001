
module.exports = function (token) {
    // if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    return fetch(`/users/`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: undefined
    })
        .then(response => response.text())
        .then(response => {
            const { name, surname, email } = JSON.parse(response)

            return { name, surname, email }
        })
}