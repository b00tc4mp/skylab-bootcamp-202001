const Feedback = require('./feedback')

module.exports = function(props = {}) {
    const { query = '', warning } = props

    return `<form class="search" action='/vehicles' method="GET">
        <h2>SEARCH</h2>
        <input type="text" name="query" placeholder="Type here to search for cars..." value="${query}">
        <button type="submit">SEARCH</button>

        ${warning ? Feedback({ level: 'warning', message: warning }) : ''}
    </form>`
}