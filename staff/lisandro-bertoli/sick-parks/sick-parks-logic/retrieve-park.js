const { NotFoundError, ContentError } = require('sick-parks-errors')
const { validate } = require('sick-parks-utils')
const fetch = require('node-fetch')

module.exports = (parkId) => {
    validate.stringFrontend(parkId, 'parkId')

    return (async () => {

        const response = await fetch(`http://192.168.1.101:8085/api/parks/${parkId}`)

        if (response.status === 200) {
            const data = await response.json()
            const { park } = data

            return park
        }


        if (response.status >= 400 || response.status < 500) {
            const data = await response.json()

            const { error } = data
            if (response.status === 404) throw new NotFoundError(`the park you are looking for does not exist or has been deleted`)


            throw new Error(error)


        } else throw new Error('Server error')

    })()

}