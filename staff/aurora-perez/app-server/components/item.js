module.exports = function ( props = {}) {
    const { result: {id, name, thumbnail, price, isFav}} = props
    return `<li className="results__item item" >
        <h3>${name} ${isFav ? '💖' : '🤍'}</span></h3>
        <img src=${thumbnail} />
        <span>${price} €</span>
    </li>`
}