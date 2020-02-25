module.exports = function (props = {}) {
    const { name = 'Anonymous', username } = props

    return `<section>
<h1>Welcome, ${name}!</h1><form action="/logout" method="POST"><input type="hidden" value="${username}" name="username"><button>Logout</button></form>
<form action="/favorites/${username}" method="GET"><button>Favorites</button></form>
</section>`
}