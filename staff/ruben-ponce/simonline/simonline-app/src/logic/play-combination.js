import context from './context'
const { validate } = require('simonline-utils')

const API_URL = process.env.REACT_APP_API_URL

export default (function (gameId, combination) {
    validate.string(gameId, 'gameId')
    validate.type(combination, 'combination', Object)

    return (async () => {
        const play = await fetch(`${API_URL}/users/games/${gameId}/playcombination`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
            body: JSON.stringify({ combination })
        })

        const { status } = await play

        if (status === 200) {
            const gameStatus = await play.json()
            return gameStatus
        }

        if (status === 409 || status === 406 || status === 403 || status === 404) {
            const { error } = await play
            throw new Error(error)
        }

        else return new Error('Unknown error')
    })()
}).bind(context)