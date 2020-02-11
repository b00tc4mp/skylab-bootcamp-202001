function retrieveCardsProfile(cards, callback) {
    if (!(cards instanceof Array)) throw new TypeError(cards.constructor.name + ' is not an Array')
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    let stringIds = ''

    for (let i = 0; i < cards.length; i++) {
      stringIds += cards[i]['multiverseid']
      if(i < cards.length - 1) stringIds+=","
    }
  
    call(`https://api.magicthegathering.io/v1/cards/?multiverseid=${stringIds}`, undefined,
    (error, response) => {
      if (error) return callback(error)
      if (response.content.length === 0) return callback(response)

      if (response.status === 200) {
        let { cards } = JSON.parse(response.content)
        console.log(cards)
        callback(undefined, cards)
      }
    }
  )
}