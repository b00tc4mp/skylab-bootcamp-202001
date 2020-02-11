function searchCharacters(query, token, callback) {
    if (typeof query !== 'object') throw new TypeError(`query ${query} is not an object`)
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)
 
    const queryString = createQuery(query)
    console.log(queryString)
    call('https://skylabcoders.herokuapp.com/api/v2/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if (error) return callback(error)

        const { error: _error, favs } = JSON.parse(response.content)

        if (_error) return callback(new Error(_error))


        call(`https://rickandmortyapi.com/api/character/?${queryString}`, undefined, (error, response) => {

            if (error) return callback(error)


            if (response.status === 200) {

                const content = JSON.parse(response.content)
                const { results } = content

                if (favs) {
                    results.forEach(character => {
                        if (favs.includes(character.id)) character.isFav = true
                    })
                }

                return callback(undefined, content)
            }

            const { error: _error } = JSON.parse(response.content)

            if (response.status === 404) return callback(new Error(_error))
            else return callback(new Error('Unknown error'))

        })
    })

}