function retrieveCharacterOfEpisodes(token, idArray, callback) {
    // if (typeof id !== 'string') throw new TypeError(`id ${id} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

 call('https://skylabcoders.herokuapp.com/api/v2/users/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    }, (error, response) => {
        if (error) return callback(error)

        const { error: _error, favCharacters } = JSON.parse(response.content)

        if (_error) return callback(new Error(_error))

        call('https://rickandmortyapi.com/api/character/' + idArray, undefined, (error, response) => {
            if (error) return callback(error)

            const result = JSON.parse(response.content)

            const { error: _error } = result

            if (_error) return callback(new Error(_error))

            if (response.status === 200) {

                if (favCharacters) {
                    result.forEach(character => {
                        if (favCharacters.includes(character.id)) character.isFav = true
                    })
                }
   
                callback(undefined, result)
            }

        })
    })


}