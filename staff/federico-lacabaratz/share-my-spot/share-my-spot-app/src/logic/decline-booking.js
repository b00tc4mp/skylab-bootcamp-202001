import { NotAllowedError, NotFoundError } from 'share-my-spot-errors'
import context from './context'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default (function (publisherId, candidateId, spotId) {

    return (async () => {
        
        let response = await fetch(`${API_URL}/spots/${spotId}/candidate/${candidateId}/decline`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            },
        })

        const { status } = response

        if (status === 201) return
        
        const { message } = response

        if (status === 401) throw new NotAllowedError(message)

        if (status === 404) throw new NotFoundError(message)

    })()

}).bind(context)