function toggleFavVehicle (idCar, token, callback) {
    if (typeof idCar !== 'string') throw new TypeError('idCar ' + idCar + ' is not a string');
    if (typeof token !== 'string') throw new TypeError('token ' + token + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError('callback ' + callback + ' is not a function');

    call(`https://skylabcoders.herokuapp.com/api/v2/users/`, options, (error, response) => {

        if (response instanceof Error) return callback(response)
console.log(response)
        const { error, status } = response

        if (error) return callback(new Error(error))

        if (status === 204) callback(idCar)
    })

}