//const {validate} = require('simonline-utils')
import context from "./context"

const API_URL = process.env.REACT_APP_API_URL

export default (function (username, password) {
    // validate.string(username, 'username')
    // validate.string(password, 'password')

    return (async () => {

        const auth = await fetch(`${API_URL}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

        const res = await auth.json()

        const { token, error } = await res
        
        if (error)
            throw new Error(error)

        else return token

    })()

})