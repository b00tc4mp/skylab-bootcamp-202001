function retrieveEpisode(token, id, callback) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')

    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no id in token')

    if (typeof id !== 'number') throw new TypeError(`id ${id} is not a number`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    }, (error, response) => {
        if (error) return callback(error)

        const data = JSON.parse(response.content)

        const { error: _error, favs } = data

        if (_error) return callback(new Error(_error))
        debugger
        call(`https://rickandmortyapi.com/api/episode/${id}`, undefined, (error, response) => {
            if (error) return callback(error)

            const episode = JSON.parse(response.content)

            const { error: _error } = episode
            if (_error) return callback(new Error(_error))

            if (favs) episode.isFav = true

            callback(undefined, episode)
        })
    })


}