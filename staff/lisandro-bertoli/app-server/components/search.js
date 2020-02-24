const Results = require('./results')
const Detail = require('./detail')
module.exports = function (props = {}) {
    const { title, error, vehicles, vehicle } = props

    return `<form class="search" action="/search" method="GET">
        <h2>${title}</h2>
        <input type="text" name="q" placeholder="criteria" /><button type="submit">Search</button>
        ${error ? `<p>${error}</p>` : ''}       
    </form >
    <br>
    ${vehicles ? Results({ vehicles }) : ''}
    ${vehicle ? Detail({ vehicle }) : ''}`
}

