import { NotAllowedError, NotFoundError } from '../errors'
import fetch from 'node-fetch'
const { validate } = require('../utils')

retrieveContacts = (token)=> {
    validate.string(token, 'token')

    return (async() => {
   
        const response = await fetch(`http://192.168.1.85:8085/api/users/contacts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    
        const { status } = response
        
        if (status === 200) {
            const contacts = await response.json()
            
            return contacts
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            if (status === 404) {
                throw new NotFoundError(error)
            }


            throw new Error(error)
        }

        throw new Error('server error')
    })()
    
}

export default retrieveContacts