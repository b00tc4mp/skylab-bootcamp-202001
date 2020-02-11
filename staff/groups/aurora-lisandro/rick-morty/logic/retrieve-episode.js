function retrieveEpisode(id, callback) {
    if (typeof id !== 'number') throw new TypeError(`id ${id} is not a number`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

    call(`https://rickandmortyapi.com/api/episode/${id}`, undefined, (error, response) => {
        if (error) return callback(error)

        const episode = JSON.parse(response.content)

        const { error: _error } = episode
        if (_error) return callback(new Error(_error))

        callback(undefined, episode)
    })

}