import { serverResponse } from '../utils'
import context from './context'
import {validate} from 'timekeeper-utils'

//const { env: { REACT_APP_API_URL: API_URL } } = process

const API_URL = process.env.REACT_APP_API_URL

export default (function (id) {
    let queryParams = []

    if(typeof id !== 'undefined'){
        validate.string(id, 'id')
        queryParams.push(`id=${id}`)
    }

    queryParams = queryParams.join('&')
    if (!!queryParams) queryParams = `?${queryParams}`

    return (async () => {
        const response = await fetch(`${API_URL}/users${queryParams}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        })

        return await serverResponse(response)
    })()
}).bind(context)