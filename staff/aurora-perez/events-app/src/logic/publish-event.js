import { validate } from 'events-utils'

const API_URL = process.env.REACT_APP_API_URL

export default (token, {title, description, location, date}) =>{
    validate.string(token, 'token')
    const {sub} = JSON.parse(atob(token.split('.')[1]))

    return (async () => {
        const response = await fetch(`${API_URL}/users/${sub}/events`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token },
            body: JSON.stringify({ title, publisher:sub, description, location, date })
        })
        
        return 
    })()
}

