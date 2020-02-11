function retrieveCharacter (id, callback) { 
    if (typeof id !== 'number') throw new TypeError(`id ${id} is not a number`)
    if (typeof callback !== 'function') throw new TypeError (`callback ${callback} is not a function`)

    call ('https://rickandmortyapi.com/api/character/' + id, undefined, (error, response)=> {
        if (error) return callback (error)

        const result = JSON.parse(response.content) 

        const {error: _error} = result

        if(_error) return callback(new Error (_error))
         
        if (response.status ===200) callback(undefined, result)
        

    })
}