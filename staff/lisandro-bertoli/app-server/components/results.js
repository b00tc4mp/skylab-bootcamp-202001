const Item = require('./item')

module.exports = function ({ vehicles }) {
    return `<ul className="results">
        ${vehicles.map(vehicle => Item({ vehicle }))}
    </ul>`
}