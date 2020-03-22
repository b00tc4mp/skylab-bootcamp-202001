import { NotAllowedError } from 'tennis-errors'
import context from './context'
require('dotenv').config()

//const { env: { REACT_APP_API_URL: API_URL } } = process

const API_URL = process.env.REACT_APP_API_URL

export default (function (day) {
    return (async () => {
        debugger
        const response = await fetch(`${API_URL}/users/booking-day`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({day})
        })

        const { status } = response

        if (status === 200) {
            const books = await response.json()

            return books
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