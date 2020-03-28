const API_URL = process.env.REACT_APP_API_URL

const { validate } = require('../hoort-utils')
const fetch = require('node-fetch')

module.exports = function (landId, veggieId, token) {
    validate.string(landId, 'landId')
    validate.string(veggieId, 'veggieId')
    validate.string(token, 'token')

    return (async () => {

        const response = await fetch(`http://localhost:8085/item/planted`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ land: landId, item: veggieId })
        })

        if (response.status === 201) {
            return
        }

        else {
            const { error } = await response.json()

            throw new Error(error)
        }
    })()
}