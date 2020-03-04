import { validate } from 'events-utils'

const API_URL = process.env.REACT_APP_API_URL

function retrieveUser(token) {
    validate.string(token, 'token')

    return fetch(`${API_URL}/users/`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: undefined
    })
        .then(response => response.json())
        .then(({error, name, surname, email}) => {
            if (error) throw new Error(error)

            return { name, surname, email }
        })
}

export default retrieveUser