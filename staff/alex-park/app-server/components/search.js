const Results = require('./results')

module.exports = function(props = {}) {
    const { error, name, username, vehicles } = props

    return `<section>
    <h2>Welcome, ${name}!</h2><form action="/logout" method="POST"><input type="hidden" value="${username}" name="username"><button>Logout</button></form>
    <form class="search" action='/query-search' method="GET">
        <h2>SEARCH</h2>
        <input type="text" name="query" placeholder="Type here to search for cars..." />
        <button type="submit">SEARCH</button>
    </form>
    ${error ? `<p class="login__error">${error}</p>` : ''}
    ${vehicles ? Results({ vehicles }) : ''}
</section>`
}