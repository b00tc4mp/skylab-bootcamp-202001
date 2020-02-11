function retrieveCardsProfile(ids, callback) {
    // if (typeof id !== 'string') throw new TypeError(id + ' is not a string')
    // if (typeof token !== 'string') throw new TypeError(token + ' is not a string')
    // if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    console.log('hhh')
    let stringIds = ''

    for (let i = 0; i < ids.length; i++) {
      stringIds += ids[i]
      if(i < ids.length - 1) stringIds+=","
    }

    console.log(stringIds)


    


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