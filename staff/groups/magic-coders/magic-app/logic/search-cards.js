/** @function searchCards */
function searchCards(query, callback) {

/**
 * @param {object} query - Query, contains all filters added and query for the search
 * @param {function} callback - Return error / cards 
 */

  if (!(query instanceof Object)) throw new TypeError(`${query} is not an object`)
  if (typeof callback !== 'function') throw new TypeError(`${callback} is not a function`)
 
  address.search = query

  let string = ''
  let keys = Object.keys(query)

  for (let i = 0; i < keys.length; i++) { 
    const property = keys[i]
    string += `${property}=${query[property]}`

    if (i < keys.length - 1) {
      string += "&&"
    }
  }

  call(`https://api.magicthegathering.io/v1/cards?${string}`, undefined,
    (error, response) => {
      
      if (error) return callback(error)

      
      if (response.status === 200) {
  
        var { cards } = JSON.parse(response.content)
        
        if (cards.length === 0) return callback(new Error("No found cards"))
        
        callback(undefined, cards)
      }
    }
  )
}