module.exports = function ( props = {}) {
    const { result: {id, name, thumbnail, price, isFav}} = props
    return `<li class="results__item favorites__item item" >
        <h3>${name} ${isFav ? `<form action ="/vehicles/fav/${id}" method ="GET"><input type ="hidden"><button>💖</button></form>`: `<form action ="/vehicles/fav/${id}" method ="GET"><input type ="hidden"><button>🤍</button></form>`}</span></h3>
        <form action="/vehicle/${id}" method="GET"><input type="hidden"><button><img src="${thumbnail}"></button></form>
        <span>${price} €</span>
    </li>`
}