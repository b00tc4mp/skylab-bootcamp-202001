import { validate } from 'staycar-utils'
import { NotAllowedError } from 'staycar-errors'
import {retrieveParking} from '../logic'


const API_URL = process.env.REACT_APP_API_URL

export default (carPlate) => {

    validate.string(carPlate, 'car plate')

    return(async () => {

        const retrievePk = await retrieveParking()
        if(retrievePk.length === 0) throw new Error('not found parking')
        
    
        const pkName = retrievePk[0].parkingName
        
        const response = await fetch(`${API_URL}/ticket/${carPlate}/${pkName}/exit`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }) 

        if(response.status === 201){
            return 
        }

        if (response.status >= 400 && response.status < 500) {
            const { error } = await response.json()

            if (response.status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()

}