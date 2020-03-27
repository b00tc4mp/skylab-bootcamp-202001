import { validate } from 'share-my-spot-utils'
import { NotAllowedError } from 'share-my-spot-errors'
import context from './context'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default (function (spotId) {
    validate.string(spotId, 'spotId')

    return (async () => {
        const response = await fetch(`${API_URL}/delete-spot/${spotId}`, {
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + this.token }
        })

        const { status } = response

        if (status === 200) return

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