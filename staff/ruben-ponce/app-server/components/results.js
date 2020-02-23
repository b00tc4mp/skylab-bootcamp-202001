const Item = require('./item')

module.exports=  function Results(vehicles) {
    console.log(vehicles)
    return` <ul className="results">
        ${vehicles.map(item => Item ({item}))}
    </ul>`
}