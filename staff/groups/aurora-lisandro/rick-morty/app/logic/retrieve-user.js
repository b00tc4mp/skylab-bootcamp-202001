/* * Function description
It retrieves user data. Only username, name and surname
* @Constructor
* param {string} token - it is necesary for get the user favorites information
* param {callback} function - it returns user public data or an error

*/


function retrieveUser(token, callback) {
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)

    const [header, payload, signature] = token.split('.')

    if (!header || !payload || !signature) throw new Error('invalid token')

    const { sub } = JSON.parse(atob(payload))

    if (!sub) throw new Error('no id in token')

    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

    call(`https://skylabcoders.herokuapp.com/api/v2/users/`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    }, (error, response) => {
        if (error) return callback(error)

        if (response.content) {
            const data = JSON.parse(response.content)
            const { error } = data

            if (error) return callback(new Error(error))

            const { name, surname, username } = data

            callback(undefined, { name, surname, username })
        }
    })

}