/** @function retrieveCardsSales */
function retrieveCardsSales(token, callback) {
  /**
   * @param {string} token - It's required for get authorization in call for return users
   * @param {function} callback - Return error / cards in to sale and users
   */
    if (typeof token !== 'string') throw new TypeError(token + ' is not string')
    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call(`https://skylabcoders.herokuapp.com/api/v2/users/all`,
      {method: "GET", headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      },
      (error, response) => {

        if (error) return callback(error)
        let users = JSON.parse(response.content), { error: _error } = users
        if (_error) return callback(new Error(_error))

        users = users.filter(user => user.mtg && user.toSale && user.phone && user.email)

        let cards = []
        users.forEach(user => user.toSale.forEach(card => cards.push(card)))
        debugger
        callback(undefined, cards, users)
      }
    )
}