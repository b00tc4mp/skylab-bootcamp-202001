const Item = require('./item')

module.exports = function (props = {}) {
    const { vehicles } = props
    return `<ul class="results">
        ${vehicles.length > 0 ? vehicles.map(vehicle => Item({ vehicle })).join('') : 'No results'}
    </ul>`
}