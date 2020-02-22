const Results = require('./results')

module.exports =function (props={}) {
    const { error , query="", vehicles } =props

    return `<section>
    <form class="search" action ="/search/" method ="GET">
        <h2>Search</h2>
        <input type="text" name="query" placeholder="search" value = ${query}>
        <button type="submit">Search</button>
        ${error ? `<p class="search__error">${error}</p>` : ''}
    </form>
        ${vehicles ? `<p class="results">${Results ({vehicles})}</p>` : ''}
    </section>`
}