/** @function retrieveUser
 * @param {string} token - It's required for get authorization in call
 * @param {function} callback - Return error / user
 * @throw - Will throw an error if token is not a string
 * @throw - Will throw an error if token is not valid
 * @throw - Will throw an error if callback is not a function
 */

function retrieveUser(token, callback) {

    if (typeof token !== 'string') throw new TypeError(token + ' is not a string');
    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    call(`https://skylabcoders.herokuapp.com/api/v2/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }, (error, response) => {
        if (error) return callback(error)
        const user = JSON.parse(response.content), {error: _error} = user
        if (_error) return callback(new Error(_error))
        callback(undefined, user)
    })
}