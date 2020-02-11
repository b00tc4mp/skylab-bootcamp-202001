function retrieveUser(token, callback) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)



    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

}