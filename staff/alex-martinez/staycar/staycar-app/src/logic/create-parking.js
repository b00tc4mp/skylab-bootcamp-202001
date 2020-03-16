import { validate } from 'staycar-utils'
import { NotAllowedError } from 'staycar-errors'
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

export default (function (parkingName, rate, totalLots) {
    
    validate.string(parkingName, 'parking name')
    validate.type(rate, "rate", Number)
    validate.type(totalLots, 'totalLots', Number)

    return( async () => {
        
        const response = await fetch(`${API_URL}/parking/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}`},
            body: JSON.stringify({ parkingName, rate, totalLots })
        })
       
        const { status } = response
        debugger
        if(status === 201) return 

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
