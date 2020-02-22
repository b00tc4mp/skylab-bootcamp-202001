require('../logic/search-vehicles')

module.exports = function(props= {}) {
    const {vehicles} = props

    let result = ''
    for(var i=0; i<vehicles.length; i++){
        result += `<h2>${vehicles[i].name}</h2>
        <img src=${vehicles[i].thumbnail}>`
    }
    
    
    return result

    
}