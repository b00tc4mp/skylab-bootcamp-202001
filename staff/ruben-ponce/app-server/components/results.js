const Item = require('./item')

module.exports=  function Results(vehicles, username) {
    
    console.log(vehicles)
    return` <ul class="results-list">
        ${vehicles.map(item => Item ({item}, username)).join('')}
    </ul>`
}