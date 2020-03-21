import context from './context'
const { validate } = require('simonline-utils')

const API_URL = process.env.REACT_APP_API_URL

export default (function (id, gameId) {
    validate.string(id, 'id')
    validate.string(gameId, 'gameId')

    return (async () => {

        const join = await fetch(`${API_URL}/users/${id}/games/${gameId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
        })
        debugger
        //const res = await create.json()
        const { status } = await join

        if (status === 200) {
            const players = await join.json()
            debugger
            return players
        }

        if (status === 201)
            return

        if(status === 404)
            return status.statusText
    })()
}).bind(context)