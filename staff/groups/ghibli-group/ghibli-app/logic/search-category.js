function searchCategory(category, token, callback) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no user id in token')

    //if (typeof query !== 'string') throw new TypeError(`${query} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/v2/users/${sub}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if (error) return callback(error)

        const user = JSON.parse(response.content), { error: _error } = user

        if (_error) return callback(new Error(_error))

        const { favs = [] } = user

        call(`https://ghibliapi.herokuapp.com/${category}`, undefined, (error, response) => {
            
            if (error) return callback(error)

            if (response.status === 200) {
                const results = JSON.parse(response.content)

                results.forEach(result => result.isFav = favs.includes(result.id))

                callback(undefined, results)
            }
        })
    })
}