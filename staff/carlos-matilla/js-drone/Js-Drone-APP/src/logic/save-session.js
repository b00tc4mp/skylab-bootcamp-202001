import context from './context'
const { NotAllowedError } = require('drone-errors')


const API_URL = process.env.REACT_APP_API_URL

export default (function (time, control, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP) {
 

    return (async () => {
        const response = await fetch(`${API_URL}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({ time, control, lowTempP, hightTempP, batteryP, heightP, speedP, atmosPressureP })
        })

        const { status } = response

        if (status === 201) return console.log('session-saved')

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}).bind(context)