module.exports = function(props = {}){
    const {vehicles, error, isFav} = props
    
    let item = ''

    for(var i=0; i<vehicles.length; i++){
        item += `<h2>${vehicles[i].name}</h2>
        <section><form action="toggle-fav/${vehicles[i].id}" method="POST"><button>${vehicles[i].isFav ? '💖' : '🤍'}</button></form></h3></section>
        <img src=${vehicles[i].thumbnail}>
        <span>${vehicles[i].price} €</span>
        <a href=/detail/${vehicles[i].id}>Go to Detail</a>
        ${error ? `<p class="register__error">${error}</p>` : ''}
        `
    }

    return item
}