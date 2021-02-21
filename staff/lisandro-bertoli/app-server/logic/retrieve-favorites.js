const { fetch } = require('../utils')

module.exports = function (token) {
    if (typeof token !== 'string') throw new TypeError(token + ' is not a string');


    return fetch('https://skylabcoders.herokuapp.com/api/v2/users/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
    })
        .then(response => {
            const user = JSON.parse(response.content)
            const { error: _error } = user


            if (_error) throw new Error(_error)

            const { favs } = user

            return favs
        })
        .then(favs => favs.map(fav => fetch(`https://skylabcoders.herokuapp.com/api/hotwheels/vehicles/${fav}`)))
        .then(calls => Promise.all(calls))
        .then(results => results.map(result => JSON.parse(result.content)))
        .then(favorites => favorites)
}
