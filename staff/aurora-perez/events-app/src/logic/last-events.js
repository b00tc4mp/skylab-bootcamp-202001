import axios from 'axios'

export default () => {
    return axios.get('http://localhost:8085/last-events')
    .then(events => events.data)
}

