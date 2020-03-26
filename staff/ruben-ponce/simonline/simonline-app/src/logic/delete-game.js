import context from './context'
const { validate } = require('simonline-utils')

const API_URL = process.env.REACT_APP_API_URL

export default (function (gameId) {
    validate.string(gameId, 'gameId')

    return (async () => {

        const deleteGame = await fetch(`${API_URL}/games/${gameId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json',
                       'Authorization': `Bearer ${this.token}` 
            }
        })

        const status = await deleteGame.status

        if (status === 409 || status === 406 || status === 403) {
            const { error } = await deleteGame
            return new Error(error)
        }

        else if (status === 200) return

        else return new Error('Unknown error')

    })()
}).bind(context)