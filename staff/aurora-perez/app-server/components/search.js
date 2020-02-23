const Results = require('./results')

module.exports =function (props={}) {
    const { error , query="", vehicles, name, username } =props

    return `<section>
    <form action="/favorites/${username}" method="GET"><button>Favorites</button></form>
    <h1>Welcome, ${name}!</h1><form action="/logout" method="POST"><input type="hidden" value="${username}" name="username"><button>Logout</button></form>
    <form class="search" action ="/search" method ="GET">
        <h1>Search</h1>
        <input type="text" name="query" placeholder="search" value = ${query}>
        <button type="submit">Search</button>
        ${error ? `<p class="search__error">${error}</p>` : ''}
    </form>
        ${vehicles ? `<p class="results">${Results ({vehicles})}</p>` : ''}
    </section>`
}