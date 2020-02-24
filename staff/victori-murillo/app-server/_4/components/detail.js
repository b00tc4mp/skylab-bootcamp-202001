
module.exports = function({ vehicle: { id, name, year, price, image, color, maker, collection, description, url, isFav } }) {

    return `<li>
        <h3>${name} (${year})
            <form method="GET" action="/toggleFav/${id}" >
                <button>
                    <span className="detail__fav" >${isFav ? '💖' : '🤍'}</span>
                </button>
            <form>
        </h3>
        <img src=${image} />
        <span>${price} €</span>
        <p>${color}</p>
        <p>${maker}</p>
        <p>${collection}</p>
       
        <p>${description}</p>
        <a href=${url}>${url}</a>
    </li>`
}