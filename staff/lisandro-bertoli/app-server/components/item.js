module.exports = function (props = {}) {
    const { vehicle: { id, thumbnail, image, name, price, isFav } } = props

    return `<article class="item">
    <form action="/vehicle/${id}" method="GET">
    <button type="submit">
        <li>
            <img class="item__thumbnail" src=${thumbnail || image} alt="" />
    
            <div class="item__info-wrapper">
                <h3 class="item__name">${name}</h3>
                <span class="item__price">$${price}</span>
            </div>
        </li>
    </button>    
    </form>
    <form action="/toggle-favorite/${id}" method="POST">
        <button type="submit">
            ${isFav ? `<i class="fas fa-heart item__heart"></i>` : `<i class="far fa-heart item__heart"></i>`}
        </button>
    </form>
    </article>`

}
