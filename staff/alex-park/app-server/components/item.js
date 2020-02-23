module.exports = function (props = {}) {
    const {result: {id, name, thumbnail, price, isFav} } = props

    return `<li class='item'>
    <h2>${name} (${id})</h2>
    <form action='/vehicle/${id}' method='GET'><input type="hidden"><button type='submit'><img src='${thumbnail}'></button></form>
    <span>${price} €</span>
    ${isFav ? `<form action="fav/${id}" method="GET"><input type="hidden"><button type="submit"><i class="fas fa-heart"></i></button></form>` : `<form action="fav/${id}" method="GET"><input type="hidden"><button type="submit"><i class="far fa-heart"></i></button></form>`}
</li>`
}