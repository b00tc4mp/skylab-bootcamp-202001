function addCardToSale(card, token, callback) {
    if (card.constructor.name !== "Object") throw new TypeError(`${card} is not an Object`)
    if (typeof token !== "string") throw new TypeError(`${card} is not a String`)
    if (typeof callback !== "function") throw new TypeError(`${card} is not a Function`)

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

        //Logic
        let {toSale} = user

        if (!toSale)
            toSale = [card]
        else
            toSale.some(_card => _card.multiverseid === card.multiverseid) ? '' : toSale.push(card)

        call('https://skylabcoders.herokuapp.com/api/v2/users', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({toSale})
        }, (error, response) => {
            if (error) return callback(error)

            if (response.status === 204) {
                return callback(undefined, 'update successful!')
            } 
        })
    })

    
}