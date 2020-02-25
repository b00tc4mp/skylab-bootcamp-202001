const Item = require('./item')

module.exports = function (props = {}) {
    const { favorites } = props
    return `<h2>Your Favorites</h2><a class="favorites__exit" href="/return"> << Go Back</a>
        <ul class="results">
            ${favorites.map(vehicle => Item({ vehicle }))}
        </ul>
`
}