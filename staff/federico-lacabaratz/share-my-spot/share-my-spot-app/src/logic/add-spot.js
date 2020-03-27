import { validate } from 'share-my-spot-utils'
import { NotAllowedError, NotFoundError } from 'share-my-spot-errors'
import context from './context'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default (function (title, addressLocation, addressStNumber, addressOther, length, width, height, area, description, price, acceptsBarker, surveillance, isCovered, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun) {

    return (async () => {
        let response = await fetch(`${API_URL}/spots`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, addressLocation, addressStNumber, addressOther, length, width, height, area, description, price, acceptsBarker, surveillance, isCovered, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun})
        })

        const { status } = response

        response = await response.json()

        if (status === 200) {
            const { id } = response
            
            return id
        }
        
        const { message } = response

        if (status === 401) throw new NotAllowedError(message)

        if (status === 404) throw new NotFoundError(message)

        throw new Error(message)
    })()

}).bind(context)