const Item = require('./item')

module.exports = function ( props = {}) {
    const {favsList } = props
    return `<div>
       
        <h2>YOUR FAVORITES</h2>
        <ul class="favorites">
            ${favsList.map(vehicle => { return Item ({ result : vehicle })})}
        </ul>
    </div>`
}