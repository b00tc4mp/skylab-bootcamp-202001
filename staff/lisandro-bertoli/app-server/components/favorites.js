const Item = require('./item')

module.exports = function ({ favs, onToSearch }) {
    return <div class="favorites">
        <h2>Favorites</h2>
        <ul>
            {favs.map(vehicle => Item({ vehicle }))}
        </ul>
        <a href="" onClick={onToSearch}>Back to Search</a>
    </div>

}