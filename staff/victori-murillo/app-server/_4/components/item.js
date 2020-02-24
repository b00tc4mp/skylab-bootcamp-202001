// module.exports = function ({ item: { id, name, thumbnail, price, isFav }, onClick, onFavClick }) {

module.exports = function ({ item: {id, name, thumbnail, price, isFav } }) {

    return `<div>
    <li className="results--item item">
        <form action="/toggleFav/${id}" method="Get" >
            <h3>${name} <button class="button-fav" ><span>${isFav ? '💖' : '🤍'}</span></button></h3>
        </form>
        <a href="/vehicles/${id}" >
            <img src=${thumbnail} />
            <span>${price} €</span>
        </a>
    </li>
</div>
`
    }