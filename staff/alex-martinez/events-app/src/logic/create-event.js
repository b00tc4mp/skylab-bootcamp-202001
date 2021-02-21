const { validate } = require('events-utils')
const API_URL = process.env.REACT_APP_API_URL



module.exports = (token, title, description, location, date) => {
    validate.string(token, 'token')
    validate.token(token, 'token')
    validate.string(title, 'title')
    validate.string(description, 'description')
    validate.string(location, 'location')
    validate.type(date, 'date', Date)

    return (async () => {


        const response = await fetch(`${API_URL}/users/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
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

}