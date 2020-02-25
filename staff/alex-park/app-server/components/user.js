module.exports = function (props = {}) {
    const { name = 'Anonymous', username } = props

    return `<section>
        <h2>Welcome, ${name}!</h2><form action="/logout" method="POST"><input type="hidden" value="${username}" name="username"
        <form class='fav-anchor' action="/favs-list/${username}" method="GET"><button><p class="favbutton">GO TO LIST OF FAVORITES</p></button></form>
    </section>`
}