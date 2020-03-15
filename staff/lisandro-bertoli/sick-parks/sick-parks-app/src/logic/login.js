import context from './context'
const API_URL = process.env.REACT_APP_API_URL
const fetch = require('node-fetch')
const { validate } = require('../sick-parks-utils')

export default (function (email, password) {
    validate.email(email, 'email')
    validate.string(email, 'email')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`http://192.168.1.101:8085/api/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()

        const { error, token } = data

        if (error) throw new Error(error)

        this.token = token

        return
    })()

}).bind(context)