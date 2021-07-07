const Item = require('./item')

module.exports = function(props = {}) {
    const { listOfFavs, username, query } = props

    return `<section>
    ${query ? `<a href="/vehicles?query=${query}">BACK</a>` : `<a href="/search/${username}">BACK</a>`}
    <ul class='favlist'>${listOfFavs.map(result => Item({result}))}</ul>
</section>`
}