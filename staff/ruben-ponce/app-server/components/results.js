const Item = require('./item')

module.exports=  function Results(vehicles, username) {
    
    console.log(vehicles)
    return` <ul className="results">
        ${vehicles.map(item => Item ({item}, username))}
    </ul>`
}