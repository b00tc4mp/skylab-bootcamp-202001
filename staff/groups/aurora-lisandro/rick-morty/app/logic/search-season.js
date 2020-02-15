/* * Function description
It search episodes from a season
* @Constructor
* param {string} querySeason - is season name identifier
* param {string} token - it is necesary for get the user favorites information
* param {callback} function - it returns the episodes of the season of the search or an error

*/


function searchSeason(querySeason, token, callback) {
    if (typeof querySeason !== 'string') throw new TypeError(`querySeason ${querySeason} is not a string`)
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

    call('https://skylabcoders.herokuapp.com/api/v2/users/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    }, (error, response) => {

        if (error) return callback(error)

        const user = JSON.parse(response.content)

        const { error: _error } = user

        if (_error) return callback(new Error(_error))

        const { favEpisodes } = user


        call(`https://rickandmortyapi.com/api/episode/?episode=${querySeason}`,
            undefined, (error, response) => {
                if (error) return callback(error)

                const season = JSON.parse(response.content)

                if (response.status === 200) {

                    const { results } = season

                    if (typeof favEpisodes !== 'undefined') {

                        results.forEach(episode => {
                            if (favEpisodes.includes(episode.id)) episode.isFav = true
                        })
                    }

                    return callback(undefined, results)
                }
                if (response.status === 404) {
                    const { error } = season
                    return callback(new Error(error))

                } else if (response.status === 429) {
                    return callback(new Error('API Limit'))
                } else {

                }
            })


    })

}
