import context from './context'
const API_URL = process.env.REACT_APP_API_URL

export default (function () {

    const [, payload] = this.token.split('.')
    const { sub } = payload

    return (async () => {
        const response = await fetch(`${API_URL}/users/${sub}/events`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` }
        })
        const results = await response.json()


        return results
    })()

}).bind(context)