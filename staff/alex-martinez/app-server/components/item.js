module.exports = function(props = {}){
    const {vehicles} = props
    
    let item = ''

    for(var i=0; i<vehicles.length; i++){
        item += `<h2>${vehicles[i].name}</h2>
        <img src=${vehicles[i].thumbnail}>
        <span>${vehicles[i].price} €</span>
        `
    }

    return item
}