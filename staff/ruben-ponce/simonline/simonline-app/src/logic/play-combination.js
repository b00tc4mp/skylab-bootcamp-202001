import context from './context'
const { validate } = require('simonline-utils')

const API_URL = process.env.REACT_APP_API_URL

export default (function (combination) {
    validate.type(combination, 'combination', Object)

    return (async () => {
        const play = await fetch(`${API_URL}/users/games/playcombination`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
            body: JSON.stringify({ combination })
        })

        const { status } = await play

        if (status === 409 || status === 406 || status === 403) {
            const { error } = await play
            throw new Error(error)
        }

        else if (status === 201) return

        else return new Error('Unknown error')
    })()
}).bind(context)