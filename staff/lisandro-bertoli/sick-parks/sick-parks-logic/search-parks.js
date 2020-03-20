require('dotenv').config()
const { NotFoundError } = require('../sick-parks-errors')
const { validate } = require('../sick-parks-utils')
const fetch = require('node-fetch')
const API_URL = process.env.API_URL

module.exports = ({ query, location }) => {
    validate.string(query, 'query')

    return (async () => {
        let response
        if (location) {
            response = await fetch(`${API_URL}/parks?q=${query}&_location=${location}`)
        } else response = await fetch(`${API_URL}/parks?q=${query}`)


        const data = await response.json()

        const { error, results } = data
        debugger
        if (error) throw new Error(error)

        return results

    })()

}