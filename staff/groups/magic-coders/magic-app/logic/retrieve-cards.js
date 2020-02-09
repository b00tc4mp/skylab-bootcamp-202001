function retrieveCards(token, callback) {

    call(`https://api.magicthegathering.io/v1/cards`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Page-Size': '10'
        }
    }, (error, response) => {

        
        const {cards} = JSON.parse(response.content)

        console.log(cards)
        callback(undefined, cards)
    })
}