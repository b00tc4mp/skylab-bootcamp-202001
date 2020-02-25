const Feedback = require('./feedback')

module.exports =function (props={}) {
    const { query="", warning } =props

    return `<section>
    <form class="search" action ="/search" method ="GET">
        <h1>Search</h1>
        <input type="text" name="query" placeholder="search" value = ${query}>
        <button type="submit">Search</button>
        ${ warning ? Feedback({ level: 'warning', message: warning }) : ''}
    </form>
    </section>`
}