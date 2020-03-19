import context from './context'
import { ContentError } from '../sick-parks-errors'
const API_URL = process.env.REACT_APP_API_URL

export default (function () {

    const token = this.getToken()
    const [, payload] = token.split('.')
    const { sub } = payload

    return (async () => {
        const response = await fetch(`${API_URL}/users/${sub}/parks`, {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })

        if (response.status === 406) {
            const { error } = await response.json()
            throw new ContentError(error)
        }

        if (response.status >= 400 && response.status < 500) throw new Error('Unknown Error')

        if (response.status >= 500) throw new Error('server error')

        const { results } = await response.json()

        return results
    })()

}).bind(context)