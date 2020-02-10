function registerUser(name, surname, username, password, callback) {
    if (typeof name !== 'string') throw new TypeError(`name ${name} is not a string`)
    if (typeof surname !== 'string') throw new TypeError(`surname ${surname} is not a string`)
    if (typeof username !== 'string') throw new TypeError(`username ${username} is not a string`)
    if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

    const appTag = 'Rick1.0'

    call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            surname,
            username,
            password,
            appTag
        })
    }, (error, response) => {
        if (error) return callback(error)

        if (response.status === 201) return callback()

        if (response.status === 409 || response.status === 400) {
            const { error } = JSON.parse(response.content)

            return callback(new Error(error))
        } else {
            return callback(new Error('Unknown error'))
        }
    })
}