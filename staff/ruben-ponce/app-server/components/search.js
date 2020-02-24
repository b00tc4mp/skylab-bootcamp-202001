const Results = require('./results')

module.exports = function(props = {}) {
    const { error = "", query = "", username, name, vehicles } = props

    return `<section>
<h1>Welcome, ${name}!</h1> <form action="/logout" method="POST"><input type="hidden" name="username"><button type="submit">Logout</button></form>
<h2>Search</h2>
<form action="/search/${username}" method="GET">
<input type="text" name="query" value="${query}">
<button>Search</button></form>
${error !== "" ? `<p>${error}</p>` : ``}
${vehicles ? Results(vehicles, username) : ``}
</section>
`
}

