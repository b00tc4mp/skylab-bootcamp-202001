function retrieveCharacter(token, id, callback) {
    debugger
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)
    // if (typeof id !== 'string') throw new TypeError(`id ${id} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

    const [header, payload, signature] = token.split('.')

    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))


    call('https://skylabcoders.herokuapp.com/api/v2/users/', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
    }, (error, response) => {

        if (error) return callback(error)

        const { error: _error, favs } = JSON.parse(response.content)

        if (_error) return callback(new Error(_error))


        call('https://rickandmortyapi.com/api/character/' + id, undefined, (error, response) => {
            if (error) return callback(error)

            const result = JSON.parse(response.content)

            const { error: _error } = result

            if (_error) return callback(new Error(_error))

            if (response.status === 200) {

                if (favs) result.isFav = true

                callback(undefined, result)
            }

        })
    })
}