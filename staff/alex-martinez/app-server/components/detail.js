require('../logic/retrieve-vehicle')
require('./item')

module.exports = function(props = {}) {
    const { vehicle, style } = props
    console.log(style)
    return `<h3>${vehicle.name} ${vehicle.year}</h3>
    <img src=${vehicle.image}>
    <span>${vehicle.price} €</span>
    <p>${vehicle.color}</p>
    <p>${vehicle.maker}</p>
    <p>${vehicle.collection}</p>
    <p><a href=${style.url}>${style.name}</a>
    <img src=${style.image}></p>
    <a href=${vehicle.url}>${vehicle.url}</a>
    <p>${vehicle.description}</p>
    `
}