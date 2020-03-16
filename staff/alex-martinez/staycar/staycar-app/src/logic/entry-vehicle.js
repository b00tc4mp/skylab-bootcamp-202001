import { validate } from 'staycar-utils'
import context from './context'
import { NotAllowedError } from 'staycar-errors'

const API_URL = process.env.REACT_APP_API_URL

export default (function(carPlate) {

    validate.string(carPlate, 'carPlate')
    
    const parkingName = this.parking

    return(async () => {
        
        const response = await fetch(`${API_URL}/${parkingName}/ticket`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({carPlate})
        }) 

        const { status } = response

        if(status === 201){
            return
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