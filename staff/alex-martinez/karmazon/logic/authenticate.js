function authenticate(username, password, callback) {
    if (typeof username !== 'string') throw new TypeError(`username ${username} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)

    call('https://skylabcoders.herokuapp.com/api/v2/users/auth',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username,password})

    },(error,response) =>{
       
        if (error) return callback(error)

        const { error: _error, token } = JSON.parse(response.content)

        if (_error) return callback(new Error(_error))

        callback(undefined, token)
        
    })
    
}