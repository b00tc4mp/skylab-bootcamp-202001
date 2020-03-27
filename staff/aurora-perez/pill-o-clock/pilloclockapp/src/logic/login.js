const { validate } = require ('../utils')
const { NotAllowedError } = require('../errors')
const fetch = require ('node-fetch')
const context = require('./context')
const API_URL = process.env.REACT_APP_API_URL

module.exports = function(email, password) {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return (async() => {
        const response = await fetch(`${API_URL}/api/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const { status } = response

        if (status === 200) {
            const { token } = await response.json()
            
            return token
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
  
}.bind(context)