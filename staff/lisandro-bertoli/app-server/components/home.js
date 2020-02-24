const Search = require('./search')

function Home(props = {}) {
    const { name, vehicles, vehicle, error } = props

    return `
    <section class="home">
        
        <h1>Welcome, ${name}</h1>
        <div class="home__actions">
        <form action="/logout" method="POST"><button>Logout</button></form>
        <p><a href="/search/favorites">Favorites</a></p>
        </div>
        ${Search({ title: 'Search', error, vehicles, vehicle })}

    </section>
    `
}
module.exports = Home