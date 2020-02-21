function Home(props) {
    const { name } = props
    return `
    <section class="home">
        <h1>Welcome ${name}</h1><form action="/logout" method="POST"><button>Logout</button></form>
    </section>
    `
}
module.exports = Home