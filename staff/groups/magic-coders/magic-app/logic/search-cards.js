function searchCards(query, callback) {
  // if (typeof query !== "string")
  //   throw new TypeError(query + " is not a string")
  // if (typeof callback !== "function")
  //   throw new TypeError(callback + " is not a function")

  // const queryObj = {
            // name: query,
            // types: 'Creature',
            // rarity: 'Rare',
            // colors: 'red|black|white',
            // cmc: 5,
            // supertypes: 'Snow',
        // }

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

      if (response.content.length === 0) return callback(response)

      if (response.status === 200) {
        
        var { cards } = JSON.parse(response.content)

        console.log(cards)
        callback(undefined, cards)
      }
    }
  )
}