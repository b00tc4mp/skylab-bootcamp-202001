module.exports = function (props = {}) {
    const { vehicle: { id, name, image, year, color, maker, collection, style, description, price, isFav }, query } = props

    return `<li class='details'>
    <h2>${id}: ${name}</h2>
    <img src=${image}>
    <div class='content'>
        <p><b>YEAR:</b> ${year}</p>
        <p><b>COLOR:</b> ${color}</p>
        <p><b>MAKER:</b> ${maker}</p>
        <p><b>COLLECTION:</b> ${collection}</p>
        <p><b>STYLE:</b> ${style}</p>
        <p><b>DESCRIPTION:</b> ${description}</p></div>
        <span>${isFav? '<p><i class="fas fa-heart"></i></p>' : '<p><i class="far fa-heart"></i></p>'}</span>
        <span>PRICE: ${price}€</span>
        <a href='/query-search?query=${query}'>BACK</a>
</li>`
}