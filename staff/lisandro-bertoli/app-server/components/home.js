const Search = require('./search')

function Home(props) {
    const { name, username, error } = props
    return `
    <section class="home">
        <h1>Welcome ${name}</h1><form action="/logout" method="POST"><button>Logout</button></form>
        ${Search({ title: 'Search', error, username })}
    </section>
    `
}
module.exports = Home