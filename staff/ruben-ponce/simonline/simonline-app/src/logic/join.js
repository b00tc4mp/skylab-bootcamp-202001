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

        //const res = await create.json()
        const res = await join

        if (res.status === 201)
            return

        if(res.status === 404)
            return res.statusText
    })()
}).bind(context)