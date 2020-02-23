const Search = require('./search')

function Home(props) {
    const { name, vehicles, vehicle, error } = props

    return `
    <section class="home">
        <h1>Welcome ${name}</h1><form action="/logout" method="POST"><button>Logout</button></form>
        <h3><a href="/search/favorites">Favorites</a></h3>
        ${Search({ title: 'Search', error, vehicles, vehicle })}

    </section>
    `
}
module.exports = Home