const results = require("./results")

module.exports = function(props = {}) {
    const { error, username, query = '', vehicles = "" } = props

    // console.log(vehicles)

    return `<section>
    <h1>${username}</h1>
    <a href="/logout" >
        <button>logout</button>
    </a>
    <h2>Search</h2>
        <form action="/search/${username}" method="GET">
            <input type="text" name="query" placeholder="search" value="${query}">
            <button>Search</button>
            ${error ? `<p class="login__error">${error}</p>` : ''}
        </form>
        <div>
            ${vehicles && results({vehicles})}
        </div>
</section>`
}