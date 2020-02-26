const { fetch } = require('../utils')

module.exports = function (token, id) {
    if (token) {
        if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)
    }

    if (typeof id !== 'string') throw new TypeError(`${id} is not a string`)

    if (token) {
        return fetch(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const user = JSON.parse(response.content), { error: _error } = user

            if (_error) throw new Error(_error)

            const { favs = [] } = user

            return fetch(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/${id}`)
            .then(response => {
                if (response.status === 200) {
                    const vehicle = JSON.parse(response.content)

                    vehicle && (vehicle.isFav = favs.includes(vehicle.id))

                    return vehicle
                }
            })
        })
    } else {
        return fetch(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/${id}`)
        .then(response => {
            if (response.status === 200) {
                const vehicle = JSON.parse(response.content)

                return vehicle
            }
        })
    }
}