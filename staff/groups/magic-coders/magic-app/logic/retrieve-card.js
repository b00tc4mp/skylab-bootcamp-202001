/** @function retrieveCard 
 * @param {string} id - It's required for concatenate id card to query
 * @param {function} callback - Return error / card
 * @throw - Will throw an error if id is not a number
 * @throw - Will throw an error if callback is not a function
 */

function retrieveCard(id, callback) {
    if (typeof id !== 'number') throw new TypeError(id + ' is not a number')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    call(`https://api.magicthegathering.io/v1/cards/${id}`, undefined,
    (error, response) => {
      if (error) return callback(error)
      if (response.content.length === 0) return callback(response)

      if (response.status === 200) {
        let { card } = JSON.parse(response.content)
        callback(undefined, card)
      }
    }
  )
}