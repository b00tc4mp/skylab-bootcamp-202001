import { validate } from 'events-utils'

const API_URL = process.env.REACT_APP_API_URL

async function retrieveUser(token){
    validate.string(token, 'token')

    const response = await fetch(`${API_URL}/users/`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: undefined
    })

    const  {error, name, surname, email } = await response.json()
    if (error) throw new Error(error)

    return { name, surname, email }


}

export default retrieveUser