/** @function addCardToSold
 * @param {number} id - Need id from item to compare 
 * @param {string} token - Need token to get users what got sales cards
 * @param {function} callback - Return error / ok
 * @throw - Will throw an error if id is not a number
 * @throw - Will throw an error if token is not a string
 * @throw - Will throw an error if callback is not a function
 */

function addCardToSold(id, token, callback) {

    if (typeof id !== 'number') throw new TypeError(`id ${id} is not a number`)
    if (typeof token !== 'string') throw new TypeError(`token ${token} is not a string`)
    if (typeof callback !== 'function') throw new TypeError(`callback ${callback} is not a function`)

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
        let {sold, toSale} = user
        const card = toSale.filter(card => card.multiverseid === id)

        toSale = toSale.filter(card => card.multiverseid !== id) //removed from toSale
        sold ? sold.push(card[0]) : sold = card //add to solds

        call('https://skylabcoders.herokuapp.com/api/v2/users', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({toSale, sold})
        }, (error, response) => {
            if (error) return callback(error)

            if (response.status === 204) {
                return callback(undefined, 'update successful!')
            } 
        })
    })

    
}