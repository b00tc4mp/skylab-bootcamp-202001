module.exports = function Item({ item: { id, name, thumbnail, price, isFav }}) {
    return `<li>
        <h3>${name}</h3>
        <form action="/details" method="POST">
        <button><img src=${thumbnail} /></button>
        <input type="hidden" value="${id}" name="id">
        </form>
        <span>${price} €</span>
    </li>`
}