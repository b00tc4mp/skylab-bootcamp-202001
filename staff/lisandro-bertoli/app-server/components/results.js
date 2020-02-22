const Item = require('./item')

module.exports = function ({ vehicles }) {
    return `<ul className="results">
        ${vehicles.length > 0 ? vehicles.map(vehicle => Item({ vehicle })) : 'No results'}
    </ul>`
}