function searchSeason(querySeason, token, callback) {
    // if (typeof querySeason !== 'string') throw new TypeError (`querySeason ${querySeason} is not a string`)
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

                } else {
                    return callback(new Error('Unkown error'))
                }
            })


    })

}

// function searchEpisodes (query, token, callback){

//     if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)
//     if (typeof query !== 'string') throw new TypeError(`query ${query} is not a string`)
//     if (typeof callback !== 'function') throw new TypeError (`callback ${callback} is not a function`)

//     call('http://skylabcoders.herokuapp.com/api/v2/users/', {
//         method: 'GET',
//         headers: { 'Authorization': 'Bearer ' + token },
//     }, (error, response) => {

//         if (error) return callback(error)

//         const user = JSON.parse(response.content)

//         const {error:_error} = user

//         if (_error) return callback(new Error(_error))

//        const {favs} = user

//     })

//     call (`https://rickandmortyapi.com/api/episode/${query}`,
//         undefined, (error, response)=> {

//         if (error) return callback(error)

//         const episodes = JSON.parse(response.content)  


//         if (response.status === 404){
//             const {error} = episodes 
//             return callback(new Error (error))

//         } else {
//             return callback(new Error('Unkown error'))

//         if (response.status === 200) {

//             if(favs.length){
//                 episodes.forEach(episode => {
//                     if(favs.includes(episode.id)) favs= true
//                 })
//             }

//             return callback(undefined, episodes)
//         }


//         }


//     }

// })