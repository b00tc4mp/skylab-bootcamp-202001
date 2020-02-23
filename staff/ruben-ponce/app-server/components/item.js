module.exports = function Item({ item: { id, name, thumbnail, price, isFav }}) {
    return `<li>
        <h3>${name}</h3>
        <img src=${thumbnail} />
        <span>${price} €</span>
    </li>`
}