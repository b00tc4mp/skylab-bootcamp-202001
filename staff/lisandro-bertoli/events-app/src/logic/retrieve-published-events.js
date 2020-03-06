const { validate } = require('events-utils')
const API_URL = process.env.REACT_APP_API_URL

export default (token) => {
    validate.string(token, 'token')
    validate.token(token, 'token')

    const [, payload] = token.split('.')
    const { sub } = payload

    return (async () => {
        const response = await fetch(`${API_URL}/users/${sub}/events`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        const results = await response.json()


        return results
    })()

}