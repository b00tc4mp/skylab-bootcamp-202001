module.exports = function (props = {}) {
    const { error } = props

    return `<section class="register">
    <h2>Register</h2>
    <form action="/register" method="POST">
        <input type="text" name="name" placeholder="Name">
        <input type="text" name="surname" placeholder="Surname">
        <input type="text" name="username" placeholder="Username">
        <input type="password" name="password" placeholder="Password">
        <button>Submit</button>
        ${error ? `<p class="register__error">${error}</p>` : ''}
    </form>
    <a href="/login">Login</a>
</section>`
}

