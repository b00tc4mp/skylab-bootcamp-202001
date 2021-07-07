const { call } = require('../utils')

module.exports = function (token, callback) {
    if (typeof token !== 'string') throw new TypeError(`${token} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: undefined
    }, (error, response) => {
        if (error) return callback(error)

        const user = JSON.parse(response.content), { error: _error } = user
        if (_error) callback(new Error(_error))

        if (typeof user.favs !== 'undefined') {
            let listOfFavs = []
            let favCounter = 0
            const { favs } = user
            for (let i = 0; i < favs.length; i++) {
                let id = favs[i]
                call(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/${id}`, undefined, (error, response) => {
                    let favedCar = JSON.parse(response.content)
                    favedCar.isFav = true
                    favedCar.thumbnail = favedCar.image
                    listOfFavs.push(favedCar)
                    favCounter++
                    if (favCounter === favs.length) {
                        listOfFavs = (listOfFavs.flat())
                        return callback(undefined, listOfFavs)
                    }
                })
            }

        } else {
            const listOfFavs = "There are no cars on favorites :^("
            callback(undefined, listOfFavs)
        }
    })
}