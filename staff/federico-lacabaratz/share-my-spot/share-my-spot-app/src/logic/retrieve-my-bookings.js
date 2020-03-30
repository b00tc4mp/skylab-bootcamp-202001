import context from './context'
const { NotAllowedError } = require('share-my-spot-errors')
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default (function () {

    return (async () => {
        const response = await fetch(`${API_URL}/users/my-bookings`, {
            method: 'GET',
            headers: { Authorization: 'Bearer ' + this.token }
        })

        const { status } = response

        if (status === 200){
            const spots = await response.json()
            return spots
        }

        if (status >= 400 && status < 500) {

            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)

        }
        throw new Error('server error')

    })()
}).bind(context)