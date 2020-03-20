
function cryptoHistory(cryptoQuery) {
    
    //devuelve una promisa.
    return fetch(`https://api.coincap.io/v2/assets/${cryptoQuery}/history?interval=d1`)
    .then( function(response) {
        if(response.status === 200) {
            console.log(response)
            return response.json()
        }
    })
    // manejar otros errores de la api 400-417 client error. 505 server error
    .then(function (response) {
        // console.log(response.data)
        return response.data
    })

    .catch(function(error) {
        console.log(error)
    })
        //manejar errores desconocidos
}

export default cryptoHistory;