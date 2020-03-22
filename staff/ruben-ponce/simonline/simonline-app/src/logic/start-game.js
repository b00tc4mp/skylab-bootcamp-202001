import context from './context'
const { validate } = require('simonline-utils')

const API_URL = process.env.REACT_APP_API_URL

export default (function (gameId) {
    validate.string(gameId, 'gameId')

    return (async () => {

        const start = await fetch(`${API_URL}/users/games/${gameId}/start`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
        })
        //const res = await create.json()
        const { status } = await start

        if (status === 200) {
            const started = await start.json()
            return started
        }

        if (status === 201)
            return

        if(status === 404)
            return status.statusText
    })()
}).bind(context)