import context from './context'
// import { NotAllowedError } from 'simonline-errors'

const API_URL = process.env.REACT_APP_API_URL

export default (function () {
    return (async () => {
        const response = await fetch(`${API_URL}/games`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        })

        const { status } = response

        if (status === 200) {
            const games = await response.json()

            return games
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                // throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}).bind(context)