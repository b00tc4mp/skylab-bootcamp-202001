function updateUsername(username, token, callback) {
    // if (typeof token !== 'string') throw new TypeError('token ' + token + ' is not a string');
    if (typeof username !== 'string') throw new TypeError('newUsername ' + username + ' is not a string');
    if (typeof callback !== 'function') throw new TypeError('callback ' + callback + ' is not a function');

    call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}`},
        body: JSON.stringify({ username })
   
    }, response => {
        if (response instanceof Error) return callback(response)
        console.log(response)
        if (response.status === 204) callback(response)
    })

}