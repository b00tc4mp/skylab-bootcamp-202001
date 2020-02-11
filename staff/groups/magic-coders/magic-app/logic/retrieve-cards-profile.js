function retrieveCardsProfile(ids, callback) {
    if (!(ids instanceof Array)) throw new TypeError(ids.constructor.name + ' is not an Array')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    let stringIds = ''

    for (let i = 0; i < ids.length; i++) {
      stringIds += ids[i]
      if(i < ids.length - 1) stringIds+=","
    }
  
    call(`https://api.magicthegathering.io/v1/cards/?multiverseid=${stringIds}`, undefined,
    (error, response) => {
      if (error) return callback(error)
      if (response.content.length === 0) return callback(response)

      if (response.status === 200) {
        let { cards } = JSON.parse(response.content)
        callback(undefined, cards)
      }
    }
  )
}