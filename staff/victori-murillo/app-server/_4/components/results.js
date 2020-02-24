const Item = require("./item")

module.exports = function( props = {} ) {
    const {vehicles = []} = props

    let output = ''
    vehicles.forEach(item => output += `${Item({item})}` )

    return `<ul class="results">${output}</ul>`
}