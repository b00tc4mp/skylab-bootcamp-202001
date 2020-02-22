const Item = require('./item')

module.exports = function ( props = {}) {
    const{vehicles} = props
    return `<ul class="results">
        ${vehicles.map(vehicle => Item ({ result : vehicle }))}
    </ul>`
}