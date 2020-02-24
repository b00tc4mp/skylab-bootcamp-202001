module.exports = function (props = {}) {
    const { name = 'Anonymus', username } = props

    return `
    <section class="home">
        
        <h1>Welcome, ${name}</h1>
        ${username
            ? `
            <div class="home__actions">
            <form action="/logout" method="POST"><button>Logout</button></form>
            <p><a href="/search/favorites">Favorites</a></p>
            </div>`
            : `<span><a href="/login">to Login</a></span><span><a href="/register"> to Register</a></span>`}
    </section>
    `
}
