import { validate } from 'events-utils'

const API_URL = process.env.REACT_APP_API_URL

export default async (token) => {
    validate.string(token, 'token')

    const [header, payload, signature] = token.split('.')
    if (!header || !payload || !signature) throw new Error('invalid token')
    
    const response = await fetch(`${API_URL}/users/`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    }) 

    const data = await response.json()

    const { error, user } = data 

    if (error) throw new Error (error)

    const { name, surname, mail } = user

    return ({ name, surname, mail })
    
    
}