

function searchCrypto(query) {
    
    //devuelve una promisa.
    return fetch(`https://api.coincap.io/v2/assets/${query.toLowerCase()}`)
    .then( function(response) {
        if(response.status === 200) {
            return response.json()
        }
    })
    
    // manejar otros errores de la api 400-417 client error. 505 server error
    .then(function (response) {
        if(response){
            // no siempre encuentra query
            return response.data
        }
    } )

    .catch(function(error) {
        console.log(error)
    })
        //manejar errores desconocidos
}

export default searchCrypto;