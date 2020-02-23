require('../logic/retrieve-vehicle')
require('./item')

module.exports = function(props = {}) {
    const { vehicle } = props

    return `<h3>${vehicle.name} ${vehicle.year}</h3>
    <img src=${vehicle.image}>
    <span>${vehicle.price} €</span>
    <p>${vehicle.color}</p>
    <p>${vehicle.description}</p>
    `
}