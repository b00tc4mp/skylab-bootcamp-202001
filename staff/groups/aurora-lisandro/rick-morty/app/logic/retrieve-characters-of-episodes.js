/* * Function description
It retrieves all of characters that show in an episode and chekcs if they are favorites or not of the user
* @Constructor
* param {string} token - it is necesary for get the user favorites information
* param {idArray} array - it is an array of the id of the characters
* param {callback} function - it returns the character list

*/

function retrieveCharacterOfEpisodes(token, idArray, callback) {
    if (!(idArray instanceof Array)) throw new TypeError(`idArray ${idArray} is not an array`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)
        if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

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