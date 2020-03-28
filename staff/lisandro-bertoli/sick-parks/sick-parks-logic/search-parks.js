const { NotFoundError } = require('sick-parks-errors')
const { validate } = require('sick-parks-utils')
const fetch = require('node-fetch')

module.exports = (query, location) => {
    validate.stringFrontend(query, 'query')
    validate.type(location, 'location', Array)
    location.forEach(coordinate => validate.type(coordinate, 'coordinate', Number))

    return (async () => {


        const response = await fetch(`http://192.168.1.101:8085/api/parks?q=${query}&location[]=${location[0]}&location[]=${location[1]}`)

        const data = await response.json()

        const { error, results } = data
        debugger
        if (error) throw new Error(error)

        return results

    })()

}