import context from './context'
const { NotAllowedError } = require('share-my-spot-errors')
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default (function (spotId) {

    return (async () => {
        const res = await fetch(`${API_URL}/${spotId}`)

        const {status} = res

        if (status === 200) {
            const results = await res.json()

            return results
        }

        if (status >= 400 && status < 500) {

            const { error } = await res.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)

        }
        throw new Error('server error')

    })()
}).bind(context)