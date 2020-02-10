function searchCharacters(query, callback) {
    if (typeof query !== 'string') throw new TypeError(`query ${query} is not a string`)
    // if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)




    call(`https://rickandmortyapi.com/api/character/?name=${query}`, undefined, (error, response) => {
        debugger
        if (error) return callback(error)

        const content = JSON.parse(response.content)

        const { error: _error, info, results } = content

        if (_error) return callback(new Error(_error))

        if (response.status === 200) return callback(undefined, content)
    })
}