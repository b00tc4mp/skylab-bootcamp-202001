const { validate } = require('events-utils')
import context from './context'
const API_URL = process.env.REACT_APP_API_URL

export default (function (title, description, location, date) {
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    debugger

    return (async () => {

        const response = await fetch(`${API_URL}/users/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
            body: JSON.stringify({ title, description, location, date })
        })
        if (response.status === 201) return

        if (response.status === 409) {
            return response.json()
                .then(response => {
                    const { error } = response

                    throw new Error(error)

                })
        } else throw new Error('Unknown error')

    })()

}).bind(context)