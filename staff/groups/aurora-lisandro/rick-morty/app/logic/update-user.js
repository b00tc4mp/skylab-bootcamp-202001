function updateUser(token, data, callback) {
    if (typeof token !== 'string') new TypeError(`token ${token} is not a 
    string`)

    const [header, payload, signature] = token.split('.')

    if (!payload || !header || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no id in token')

    if (typeof callback !== 'function') new TypeError(`callback ${callback} is not a function`)
    if (typeof data !== 'object') new TypeError(`data ${data} is not an object`)

    const { name, surname, username, password, oldPassword } = data

    if (name !== undefined) {
        if (typeof name !== 'string') throw new TypeError(`name ${name} is not a string`)
        if (!name.trim().length) throw new Error('name empty')
    }

    if (surname !== undefined) {
        if (typeof surname !== 'string') throw new TypeError(`surname ${surname} is not a string`)
        if (!surname.trim().length) throw new Error('surname empty')
    }

    if (username !== undefined) {
        if (typeof username !== 'string') throw new TypeError(`username ${username} is not a string`)
        if (!username.trim().length) throw new Error('username empty')
    }

    if (password !== undefined) {
        if (typeof password !== 'string') throw new TypeError(`password ${password} is not a string`)
        if (!password.trim().length) throw new Error('password empty')
    }

    if (oldPassword !== undefined) {
        if (typeof oldPassword !== 'string') throw new TypeError(`oldPassword ${oldPassword} is not a string`)
        if (!oldPassword.trim().length) throw new Error('oldPassword empty')
    }

    const keys = Object.keys(data)

    const VALID_KEYS = ['name', 'surname', 'username', 'password', 'oldPassword']

    for (const key of keys) {
        if (!VALID_KEYS.includes(key)) throw new Error(`you can't change ${key} `)
    }

    call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }, (error, response) => {
        if (error) return callback(error)

        if (response.status === 204) return callback()
        else {
            const { error } = JSON.parse(response.content)
            return callback(new Error(error))
        }
    })
}