const { NotFoundError } = require('../sick-parks-errors')
const { validate } = require('../sick-parks-utils')
const fetch = require('node-fetch')

module.exports = ({ query, location }) => {
    validate.string(query, 'query')

    return (async () => {
        let response
        if (location) {
            response = await fetch(`http://192.168.1.101:8085/api/parks?q=${query}&_location=${location}`)
        } else response = await fetch(`http://192.168.1.101:8085/api/parks?q=${query}`)


        const data = await response.json()

        const { error, results } = data

        if (error) throw new Error(error)

        return results

    })()

}