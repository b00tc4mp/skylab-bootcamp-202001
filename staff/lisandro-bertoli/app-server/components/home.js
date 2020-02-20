function Home(props) {
    const { name } = props
    return `
    <section class="home">
        <h1>Welcome ${name}</h1>
    </section>
    `
}
module.exports = Home