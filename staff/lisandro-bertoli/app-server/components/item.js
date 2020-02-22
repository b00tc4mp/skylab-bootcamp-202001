module.exports = function ({ vehicle: { id, thumbnail, name, price, isFav } }) {

    return `<form action="/vehicle/${id}" method="GET">
    <button type="submit">
        <li class="item" >
            <img class="item__thumbnail" src=${thumbnail} alt="" />
            <div>
                ${isFav ? `<i class="fas fa-heart item__heart"></i>` : `<i class="far fa-heart item__heart"></i>`}
            </div>

            <div class="item__info-wrapper">
                <h3 class="item__name">${name}</h3>
                <span class="item__price">${price}</span>
            </div>
        </li>
    </button>    
    </form>`
}
