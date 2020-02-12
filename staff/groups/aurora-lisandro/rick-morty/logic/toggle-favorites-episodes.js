function toggleFavoritesEpisodes(token, id, callback) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)
    if (typeof id !== 'number') throw new TypeError(`id ${id} is not a number`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no user id in token')

    call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }

    }, (error, response) => {
        if (error) return callback(error)

        if (response.content) {
            const user = JSON.parse(response.content)
            const { error, favEpisodes = [] } = user

            if (error) return callback(new Error(error))

            favEpisodes.toggle(id)


            call('https://skylabcoders.herokuapp.com/api/v2/users/', {
                method: 'PATCH',
                headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
                body: JSON.stringify({ favEpisodes })
            },
                (error, response) => {
                    if (error) return callback(error)

                    if (response.content) {
                        const { error } = JSON.parse(response.content)
                        if (error) return callback(new Error(error))
                    }
                    if (response.status === 204) {
                        callback()
                    }
                })
        }
    })

}