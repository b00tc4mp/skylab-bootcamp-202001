import { validate } from 'staycar-utils'
import context from './context'
import { NotAllowedError } from 'staycar-errors'
import retrieveParking from './retrieve-parking'

const API_URL = process.env.REACT_APP_API_URL

export default (function(carPlate) {

    validate.string(carPlate, 'carPlate')

    return(async () => {

        const retrievePk = await retrieveParking()
        if(!retrievePk) throw new Error('not found parking')
        
        const response = await fetch(`${API_URL}/${retrievePk}/ticket`, {
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