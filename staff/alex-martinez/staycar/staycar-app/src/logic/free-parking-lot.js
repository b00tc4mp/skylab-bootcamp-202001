import { validate } from 'staycar-utils'
import { NotAllowedError, NotFoundError} from 'staycar-errors'
import  retrieveParking  from './retrieve-parking'


const API_URL = process.env.REACT_APP_API_URL


export default (lotNumber) => {
    
    if(!lotNumber) throw new Error('lot number is empty')
    validate.type(lotNumber, 'lot number', Number)


    return( async () => {

        const retrievePk = await retrieveParking()
        if(retrievePk.length === 0) throw new NotFoundError('not found parking')
    
        const pkName = retrievePk[0].parkingName
        
        const response = await fetch(`${API_URL}/parking/${pkName}/free`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ lotNumber })
        })
       
        const { status } = response
        
        if(status === 201) {
            
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

}
