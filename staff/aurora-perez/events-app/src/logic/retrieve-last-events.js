import { validate } from 'events-utils'

const API_URL = process.env.REACT_APP_API_URL

export default () =>{

    return (async () => {
        const response = await fetch(`${API_URL}/last-events`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        const lastEvents = await response.json()
        
        return lastEvents
    })()
}

