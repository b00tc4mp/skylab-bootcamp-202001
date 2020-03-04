const API_URL = process.env.REACT_APP_API_URL

function retrieveLastEvents() {
    return fetch(`${API_URL}/events`, { headers: { "Content-Type": "application/json" } })
        .then(response => response.json())
        .then(events => events)
}

export default retrieveLastEvents