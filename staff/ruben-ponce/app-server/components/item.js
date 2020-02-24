module.exports = function Item({ item: { id, name, thumbnail, price, isFav }}, username) {
    
    return `<li>
        <h3>${name}</h3>
        <form action="/details/${id}" method="POST">
        <button><img src=${thumbnail} /></button>
        <input type="hidden" value="${id}" name="id">
        <input type="hidden" value="${username}" name="username">
        </form>
        <span>${price} €</span>
    </li>`
}