import { validate } from 'events-utils'

const API_URL = process.env.REACT_APP_API_URL
//const TEST_MONGODB_URL = process.env.REACT_APP_TEST_MONGODB_URL

export default async (name, surname, email, password)=> {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

        const response = await fetch(`${API_URL}/users`, {
        //const response = await fetch(`http://localhost:8085/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password })
        })
        
        if (response.status === 201) return

        if (response.status === 409) {
            const responseObj = await response.json()

            const { error } = responseObj
            throw new Error(error)

        } else throw new Error('Unknown error')

       
    
}