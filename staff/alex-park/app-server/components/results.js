const Item = require('./item')

module.exports = function (props = {}) {
    const { vehicles } = props

    return `<ul class='results'>${vehicles.map(vehicle => { return Item({ result: vehicle }) }).join('')}</ul>`
}