module.exports = function (props = {}) {
    const {result: {id, name, thumbnail, price, isFav} } = props

    return `<li class='item'>
    <h2>${name} (${id})</h2>
    <form action='/vehicle/${id}' method='GET'><input type="hidden"><button type='submit'><img src='${thumbnail}'></button></form>
    <span>${price} €</span>
    <span>${isFav? '<p><i class="fas fa-heart"></i></p>' : '<p><i class="far fa-heart"></i></p>'}</span>
</li>`
}