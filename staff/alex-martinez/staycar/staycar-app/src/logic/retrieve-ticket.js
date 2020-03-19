import { NotAllowedError } from 'staycar-errors'
import context from './context'
import retrieveParking from './retrieve-parking'

const API_URL = process.env.REACT_APP_API_URL

export default (function (carPlate) {

    return (async () => {

        const retrievePk = await retrieveParking()
        if(!retrievePk) throw new Error('not found parking')
        
        const response = await fetch(`${API_URL}/ticket/${carPlate}/${retrievePk}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const { status } = response

        if (status === 200) {
            const result = await response.json()
            return result
            //console.log(result)
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