const Item = require('./item')

module.exports = function ( props = {}) {
    const {favsList, query } = props
    return `<div>
        ${query ? `<a href='/search?query=${query}'>BACK</a>`: "<a href='/search'>BACK</a>"}
        <h2>YOUR FAVORITES</h2>
        <ul class="favorites">
            ${favsList.map(vehicle => { return Item ({ result : vehicle })})}
        </ul>
    </div>`
}