module.exports = function (props = {}) {
    const {result: {id, name, thumbnail, price, isFav} } = props

    return `<li class='item'>
    <h2>${name} (${id})</h2>
    <img src='${thumbnail}'>
    <span>${price} €</span>
    <span>${isFav? '<p><i className="fas fa-heart"></i></p>' : '<p><i className="far fa-heart"></i></p>'}</span>
</li>`
}