import { validate } from 'events-utils'

const { env: { REACT_APP_API_URL: API_URL } } = process

export default () => {
    return fetch.get('http://localhost:8085/last-events')
    .then(events => events.data)
}

