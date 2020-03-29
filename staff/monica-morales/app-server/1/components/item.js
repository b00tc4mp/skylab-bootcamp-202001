module.exports = function(props = {}) {
    const { item: { id, name, thumbnail, price, isFav } } = props

    return `<li class="results--item item">
        <h3>${name} </h3> <form action="toggle-fav/${id}" method="POST"><button>${isFav ? '💖' : '5'}</button></form>
        <form action= "/detail/${id}"  method: "GET"><button type="submit" value=${id}><img src="${thumbnail}"></button></form>
        <span>${price} €</span>
    </li>`
}