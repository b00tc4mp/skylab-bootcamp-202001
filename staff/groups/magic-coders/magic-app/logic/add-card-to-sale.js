function addCardToSale(card, token, callback) {
    if (card.constructor.name !== "Object") throw new TypeError(`${card} is not an Object`)
    if (typeof token !== "string") throw new TypeError(`token ${token} is not a string`)
    if (typeof callback !== "function") throw new TypeError(`callback ${callback} is not a function`)

    const [header, payload, signature] = token.split('.')
    if(!header || !payload || !signature) throw new Error('invalid token')

    for (const key in card) {
        const value = card[key]
        let expect = key === 'multiverseid' ? 'number' : 'string'

        if (typeof value !== expect) throw new TypeError(`${key} ${value} is not a ${expect}`)
        if (expect === "string" && !value.trim().length) throw new TypeError(`${key} is empty or blank`)
    }

    const keys = Object.keys(card)
    const VALID_KEYS = ['multiverseid', 'name', 'imageUrl', 'user']
    
    keys.forEach(key => {
        if (!VALID_KEYS.includes(key)) throw new Error(`property ${key} is not allowed`)
    })
    

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