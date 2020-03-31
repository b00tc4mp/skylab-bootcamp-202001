import { NotAllowedError } from 'drone-errors'
import context from './context'
import {httpPort} from './'



const API_URL = process.env.REACT_APP_API_URL

export default (function (port, httpPort) {
    return (async () => {
       
        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify( {port, httpPort} )
        })
        
        const { status } = response
        
        if (status === 200) {
            
            const { port } = await response.json()
            return port
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