module.exports = function(props){
    const { vehicle: { id, name, year, price, image, color, maker, collection, description, url, isFav }, styles: { name: styleName, image: styleImage, url: styleUrl }, username } = props
    return `
    <a href="/search/${username}"><-- Back</a>
    <form action="/toggle-fav/${id}" method="POST">
        <button class="detail__fav">${isFav ? '💖' : '🤍'}</button>
    </form>
        <h3>${name} (${year})</h3> 
         <img src=${image} />
         <span>${price} €</span>
         <p>${color}</p>
         <p>${maker}</p>
         <p>${collection}</p>
         <p>
             <a href=${styleUrl}>${styleName}</a>
             <img src=${styleImage} />
         </p>
         <p>${description}</p>
         <a href=${url}>${url}</a>
    `
}

