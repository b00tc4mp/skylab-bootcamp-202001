module.exports = function(props = {}) {
    const { error } = props
    return `<section class="login">
    <h2>Login</h2>
    <form action="/login" method="POST">
        <input type="text" name="username" placeholder="Username">
        <input type="password" name="password" placeholder="Password">
        ${error ? `<p class="login__error">${error}</p>` : ''}
        <button>LOGIN</button>
    </form>
    <a href="/register">Register</a>
</section>`
}