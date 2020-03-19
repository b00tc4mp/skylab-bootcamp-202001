import context from './context'
const API_URL = process.env.REACT_APP_API_URL
const fetch = require('node-fetch')


export default (function retrieveUser() {

    return (async () => {
        const token = await this.getToken()
        const [, payload] = token.split('.')


        const response = await fetch(`${API_URL}/users/${payload}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })

        const data = await response.json()
        const { error: _error } = data

        if (_error) throw new Error(_error)

        const { name, surname, email, contributions, image, allowLocation, notifications } = data

        return { name, surname, email, contributions, image, allowLocation, notifications }

    })()
}).bind(context)