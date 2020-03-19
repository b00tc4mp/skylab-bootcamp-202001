require('dotenv').config()
const { NotFoundError, ContentError } = require('../sick-parks-errors')
const { validate } = require('../sick-parks-utils')
const fetch = require('node-fetch')
const API_URL = process.env.REACT_APP_API_URL

export default retrieveParks = (parkId) => {
    validate.string(parkId, 'parkId')

    return (async () => {

        const response = await fetch(`${API_URL}/parks/${parkId}`)


        if (response.status === 404) throw new NotFoundError(`the park you are looking for does not exist or has been deleted`)

        if (response.status === 406) {
            const data = await response.json()

            const { error } = data

            throw new ContentError(error)

        }

        if (response.status >= 400 && response.status < 500) throw new Error('unknown error')

        if (response.status >= 500) throw new Error('server error')

        const data = await response.json()
        const { park } = data



        return park

    })()

}