function registerUser({name, surname, phone, email, username, password}, callback) {
    if (typeof name !== 'string') throw new TypeError('name ' + name + ' is not a string');
    if (!name.trim()) throw new Error('name is empty');
    if (typeof surname !== 'string') throw new TypeError('surname ' + surname + ' is not a string');
    if (!surname.trim()) throw new Error('surname is empty');
    if (typeof phone !== 'string') throw new TypeError(phone + ' is not a number');
    if (typeof email !== 'string') throw new TypeError(email + ' is not a string');
    if (!email.trim()) throw new Error('email is empty');
    if (typeof password !== 'string') throw new TypeError('password ' + password + ' is not a string');
    if (!password.trim()) throw new Error('password is empty');
    if (typeof callback !== "function") throw new Error(`${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, surname, phone, email, username, password, mtg: true })
    }, (error, response) => {
        // Network Error
        if (error) return callback(error)

        // Error if user already exist
        if (response.content) {
            const {error: _error} = JSON.parse(response.content)
            if (_error) return callback(new Error(_error))
        } 

        callback(undefined, "user registered!")
    })
}