// const { validate } = require('simonline-utils')
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

export default (function (token) {
    // validate.string(token, 'token')

    return (async () => {

        const retrieve = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })

        const res = await retrieve.text()
        const user = await res

        if(user.error) return new Error(user.error)

        else return JSON.parse(user)

    })()

}).bind(context)