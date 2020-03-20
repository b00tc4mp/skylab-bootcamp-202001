import { NotAllowedError } from 'tennis-errors'
import context from './context'
import { validate } from 'tennis-utils'

//const { env: { REACT_APP_API_URL: API_URL } } = process

const API_URL = process.env.REACT_APP_API_URL

export default (function (user2, user3, user4, number, date ) {
    validate.string(user2, 'user2')
    if (user3){
        validate.string(user3, 'user3')
    }
    if(user4){
        validate.string(user4, 'user4')
    }
    validate.string(number,  'number')
    validate.string(date, 'date')

    return (async () => {
        debugger
        const response = await fetch(`http://localhost:8080/users/bookings/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({ user2, user3, user4, number, date })
        })

        const { status } = response

        if (status === 201) return 

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