
module.exports = function(props = {}) {
    const { error, } = props

    return `<form action="/search" method="GET">
    <input type="text" name="query" placeholder="criteria...">
    <button type="submit">Send</button>
    ${error ? `<p class="login__error">${error}</p>` : ''}
    </form>`
}