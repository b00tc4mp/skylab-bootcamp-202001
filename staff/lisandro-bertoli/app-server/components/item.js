module.exports = function ({ vehicle: { id, thumbnail, name, price, isFav } }) {

    return `<form action="/details/${id}" method="GET">
    <button type="submit">
        <li className="item" >
            <img className="item__thumbnail" src=${thumbnail} alt="" />
            <div>
                ${isFav ? `<i className="fas fa-heart item__heart"></i>` : `<i className="far fa-heart item__heart"></i>`}
            </div>

            <div className="item__info-wrapper">
                <h3 className="item__name">${name}</h3>
                <span className="item__price">${price}</span>
            </div>
        </li>
    </button>    
    </form>`
}
