function authenticateUser(username, password, callback) {
    if (typeof username !== 'string') throw new TypeError(`username ${username} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

    call('https://skylabcoders.herokuapp.com/api/v2/users/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })

    }, (error, response) => {
        if (error) return callback(error)

        const { error: _error, token } = JSON.parse(response.content)

        if (_error) return callback(new Error(_error))


        call('https://skylabcoders.herokuapp.com/api/v2/users/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },

        }, (error, response) => {
            if (error) return callback(error)

            const user = JSON.parse(response.content)

            const { error: _error, appTag } = user

            if (_error) return callback(new Error(_error))

            if (!appTag || appTag !== 'Rick1.0') return callback(new Error('username and/or password wrong'))


            callback(undefined, token)

        })

    })

}