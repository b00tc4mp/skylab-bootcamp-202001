
module.exports = function(props = {}) {
    const { error } = props

    return `<form action="/search" method="POST">
    <input type="text" name="query" placeholder="criteria...">
    <button>Send</button>
    ${error ? `<p class="login__error">${error}</p>` : ''}
    </form>`
}