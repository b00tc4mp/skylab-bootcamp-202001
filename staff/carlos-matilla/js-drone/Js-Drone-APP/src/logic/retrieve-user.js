import { NotAllowedError } from 'drone-errors'
import context from './context'


const API_URL = process.env.REACT_APP_API_URL
console.log(API_URL)

export default (function () {
    console.log('logic token', this.token)
    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        })
        
        
        const { status } = response
        console.log(status)

        if (status === 200) {
            const user = await response.json()
            console.log(user)
            return user
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}).bind(context)