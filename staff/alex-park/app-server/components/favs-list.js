const Item = require('./item')

module.exports = function(props = {}) {
    const { listOfFavs, username } = props

    return `<section>
    <a href="/search/${username}">BACK</a> 
    <ul class='favlist'>${listOfFavs.map(result => Item({result}))}</ul>
</section>`
}